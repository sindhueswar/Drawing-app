import io from 'socket.io-client';
import { fabric } from 'fabric';

const socket = io('http://localhost:4000');

const handleSocketDraw = (data, editor) => {
  if (!editor || !editor.canvas) return;
  let shape;
  switch (data.tool) {
    case 'brush':
      shape = new fabric.Path(data.path, {
        stroke: data.color,
        strokeWidth: data.width,
        fill: 'none',
      });
      break;
    case 'rectangle':
      shape = new fabric.Rect({
        left: data.left,
        top: data.top,
        fill: data.fillColor ? data.color : 'transparent',
        stroke: data.color,
        strokeWidth: data.width,
        width: data.width,
        height: data.height,
      });
      break;
    case 'circle':
      shape = new fabric.Circle({
        left: data.left,
        top: data.top,
        radius: data.radius,
        fill: data.fillColor ? data.color : 'transparent',
        stroke: data.color,
        strokeWidth: data.width,
      });
      break;
    case 'triangle':
      shape = new fabric.Triangle({
        left: data.left,
        top: data.top,
        width: data.width,
        height: data.height,
        fill: data.fillColor ? data.color : 'transparent',
        stroke: data.color,
        strokeWidth: data.width,
      });
      break;
    case 'line':
      shape = new fabric.Line([data.x1, data.y1, data.x2, data.y2], {
        stroke: data.color,
        strokeWidth: data.width,
      });
      break;
    case 'polygon':
      shape = new fabric.Polygon(data.points, {
        left: data.left,
        top: data.top,
        fill: data.fillColor ? data.color : 'transparent',
        stroke: data.color,
        strokeWidth: data.width,
      });
      break;
    case 'textbox':
      shape = new fabric.Textbox(data.text, {
        left: data.left,
        top: data.top,
        fill: data.color,
        fontSize: data.width,
        fontFamily: data.fontFamily,
      });
      break;
    default:
      return;
  }
  shape.set({ id: data.id });
  editor.canvas.add(shape);
  editor.canvas.renderAll();
};

const handleSocketMove = (data, editor) => {
  if (!editor) return;
  const obj = editor.canvas.getObjects().find((o) => o.id === data.id);
  if (obj) {
    obj.set({
      left: data.left,
      top: data.top,
    });
    editor.canvas.renderAll();
  }
};

const handleSocketErase = (data, editor) => {
  if (!editor) return;
  const obj = editor.canvas.getObjects().find((o) => o.id === data.id);
  if (obj) {
    editor.canvas.remove(obj);
    editor.canvas.renderAll();
  }
};

const handleSocketHistory = (data, editor) => {
  if (!editor) return;
  editor.canvas.loadFromJSON(data, () => {
    editor.canvas.renderAll();
  });
};

const broadcastHistory = (editor) => {
  if (!editor) return;
  const canvasState = editor.canvas.toDatalessJSON();
  socket.emit('history', canvasState);
};

export {
  socket,
  handleSocketDraw,
  handleSocketMove,
  handleSocketErase,
  handleSocketHistory,
  broadcastHistory,
};
