import React from "react";
import { MdDelete } from "react-icons/md";
import { LuUndo2, LuRedo2 } from "react-icons/lu";
const Tools = ({
  selectedColor,
  setSelectedColor,
  brushWidth,
  setBrushWidth,
  fillColor,
  setFillColor,
  undo,
  redo,
  clearCanvas,
}) => {
  const colorList = ["#f44336", "#9C27B0", "#03A9F4", "#4CAF50"];
  return (
    <div className="flex mx-5 space-x-4 items-center mb-4 ">
      {colorList.map((color) => (
        <div
          color={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          value={selectedColor}
          style={{ backgroundColor: color }}
          className="w-6 h-6 rounded-full cursor-pointer hover:opacity-60 duration-200 border border-black-2px"
        ></div>
      ))}

<input
        type="color"
        onChange={(e) => setSelectedColor(e.target.value)}
        value={selectedColor}
        className="w-6 h-6 rounded-full cursor-pointer hover:opacity-60 duration-200"
      />
       

      <input
        type="range"
        min="1"
        max="50"
        value={brushWidth}
        onChange={(e) => setBrushWidth(e.target.value)}
        className="..."
      />

      <button onClick={undo} className="text-black-700 border border-black-700 hover:bg-black-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-black-500 dark:text-black-500 dark:hover:text-black dark:focus:ring-black-800 dark:hover:bg-black-500">
        {" "}
        <LuUndo2 />{" "}
      </button>
      <button onClick={redo} className="text-black-700 border border-black-700 hover:bg-black-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-black-500 dark:text-black-500 dark:hover:text-black dark:focus:ring-black-800 dark:hover:bg-black-500">
        {" "}
        <LuRedo2 />{" "}
      </button>
      <button onClick={clearCanvas} className="text-black-700 border border-black-700 hover:bg-black-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-black-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-black-500 dark:text-black-500 dark:hover:text-black dark:focus:ring-black-800 dark:hover:bg-black-500">
        {" "}
        <MdDelete />{" "}
      </button>
    </div>
  );
};

export default Tools;
