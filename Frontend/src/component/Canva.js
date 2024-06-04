
import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import DrawingTools from "./Toolbox1";
import Tools from "./Toolbox2";
import { fabric } from "./FabricExtender";
import {
  socket,
  handleSocketDraw,
  handleSocketMove,
  handleSocketErase,
  handleSocketHistory,
  broadcastHistory,
} from "./SocketHandlers";

const Canvas = () => {
  const { editor, onReady } = useFabricJSEditor();
  const [selectedTool, setSelectedTool] = useState("brush");
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushWidth, setBrushWidth] = useState(5);
  const [selectedColor, setSelectedColor] = useState("#000");
  const [fillColor, setFillColor] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [canvasSize, setCanvasSize] = useState({ width: 1210, height: 400 });
  const [mode, setMode] = useState("drawing");

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!editor) return;

    editor.canvas.freeDrawingBrush.width = brushWidth;
    editor.canvas.freeDrawingBrush.color = selectedColor;
    editor.canvas.isDrawingMode = mode === "drawing";

    socket.on("draw", (data) => handleSocketDraw(data, editor, mode));
    socket.on("move", (data) => handleSocketMove(data, editor));
    socket.on("erase", (data) => handleSocketErase(data, editor));
    socket.on("history", (data) => handleSocketHistory(data, editor));
    if (editor && editor.canvas) {
        editor.canvas.setWidth(canvasSize.width);
        editor.canvas.setHeight(canvasSize.height);
      }
    return () => {
      socket.off("draw");
      socket.off("move");
      socket.off("erase");
      socket.off("history");
    };
  }, [editor, brushWidth, selectedColor, mode , canvasSize]);

  useEffect(() => {
  
  }, [editor,]);
  useEffect(() => {
    if (!editor || !editor.canvas) return;
  
    const handleObjectModified = (e) => {
      if (editor.canvas.getActiveObject().get("type") !== "activeSelection") {
        const object = e.target;
        const deltaX = e.e.movementX;
        const deltaY = e.e.movementY;
        object.set({ left: object.left + deltaX, top: object.top + deltaY });
        socket.emit("move", { objectId: object.id, newLeft: object.left, newTop: object.top });
        broadcastHistory(editor);
      }
    };  
    editor.canvas.on("object:modified", handleObjectModified);
      return () => editor.canvas.off("object:modified", handleObjectModified);
  }, [editor]);
 ;
 const clearCanvas = () => {
    editor.canvas.clear(); // Clear all objects from canvas
  };  const handleEraser = () => {    
       editor.canvas.freeDrawingBrush.width=brushWidth;
       editor.canvas.freeDrawingBrush.color= "white";
        editor.canvas.isDrawingMode = true; 
  };
  const undo = () => {
    editor.canvas.undo(() => {
      broadcastHistory(editor);
    });
  };
  const redo = () => {
    editor.canvas.redo(() => {
      broadcastHistory(editor);
    });
  };

  const startDrawing = () => {
    setSelectedTool("brush");
    setIsDrawing(true);
    setMode("drawing");
    editor.canvas.isDrawingMode = true;
    editor.canvas.defaultCursor = "crosshair";
    editor.canvas.freeDrawingBrush.width = brushWidth;
    editor.canvas.freeDrawingBrush.color = selectedColor;
    editor.canvas.on("path:created", (event) => {
        const path = event.path;
        path.set({ id: new Date().getTime().toString() });
        socket.emit("draw", {
          id: path.id,
          tool: "brush",
          path: path.path,
          color: selectedColor,
          width: brushWidth,
        });
        broadcastHistory(editor);
      });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setMode("manipulation");
    editor.canvas.isDrawingMode = false;
    editor.canvas.defaultCursor = "default";
    if (selectedTool === "brush") {
      const path = editor.canvas.getObjects("path").pop();
      path.set({ id: new Date().getTime().toString() });
        }
  };

  const addShape = (shape) => {
    let shapeObject;
    const left = 100;
    const top = 100;

    setSelectedTool(shape);
    setMode("manipulation");
    editor.canvas.isDrawingMode = false;

    switch (shape) {
      case "rectangle":
        shapeObject = new fabric.Rect({
          left,
          top,
          fill: fillColor ? selectedColor : "transparent",
          stroke: selectedColor,
          strokeWidth: brushWidth,
          width: 100,
          height: 100,
        });
        break;
      case "circle":
        shapeObject = new fabric.Circle({
          left,
          top,
          radius: 50,
          fill: fillColor ? selectedColor : "transparent",
          stroke: selectedColor,
          strokeWidth: brushWidth,
        });
        break;
      case "triangle":
        shapeObject = new fabric.Triangle({
          left,
          top,
          width: 100,
          height: 100,
          fill: fillColor ? selectedColor : "transparent",
          stroke: selectedColor,
          strokeWidth: brushWidth,
        });
        break;
      case "line":
        shapeObject = new fabric.Line([50, 100, 200, 100], {
          stroke: selectedColor,
          strokeWidth: brushWidth,
        });
        break;
      case "polygon":
        shapeObject = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 25 },
            { x: 100, y: 75 },
            { x: 50, y: 100 },
            { x: 0, y: 75 },
            { x: 0, y: 25 },
          ],
          {
            left,
            top,
            fill: fillColor ? selectedColor : "transparent",
            stroke: selectedColor,
            strokeWidth: brushWidth,
          }
        );
        break;
      default:
        return;
    }
    shapeObject.set({ id: new Date().getTime().toString() });
    editor.canvas.add(shapeObject);
    socket.emit("draw", {
      id: shapeObject.id,
      tool: shape,
      left,
      top,
      color: selectedColor,
      width: brushWidth,
      height: 100,
      fillColor,
      radius: 50,
    });
    broadcastHistory(editor);
  };

  const addText = () => {
    if (!editor || !editor.canvas) return;

    const left = 100;
    const top = 100;

    setSelectedTool("textbox");
    setMode("manipulation");
    editor.canvas.isDrawingMode = false;

    const textObject = new fabric.Textbox("Enter your Text", {
      left,
      top,
      fill: "#000",
      fontSize: 20,
      fontFamily: "Arial",
    });

    editor.canvas.add(textObject);

    socket.emit("draw", {
      tool: "textbox",
      left,
      top,
      color: "#000",
      fontSize: 20,
      fontFamily: "Arial",
      text: "Enter your Text",
    });

    broadcastHistory(editor);
  };

  return (
    <div className="flex flex-col items-center p-4">
        <div className="flex flex-row">
      <DrawingTools
        startDrawing={startDrawing}
        addShape={addShape}       
        setSelectedTool={setSelectedTool}
        addText={addText}
        handleEraser={handleEraser}
        fillColor={fillColor}
      />
      <Tools
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        brushWidth={brushWidth}
        setBrushWidth={setBrushWidth}        
        setFillColor={setFillColor}
        textValue={textValue}
        undo={undo}
        redo={redo}
        clearCanvas={clearCanvas}
      />
      </div>
      <div className="border border-gray-300 rounded-lg w-full h-full">
        <FabricJSCanvas
          onReady={onReady}
          onMouseDown={isDrawing ? null : () => editor.canvas.defaultCursor = 'move'}
          onMouseUp={isDrawing ? stopDrawing : null}
          style={{ width: canvasSize.width, height: canvasSize.height }}
        />
      </div>
    </div>
  );
};

export default Canvas;

