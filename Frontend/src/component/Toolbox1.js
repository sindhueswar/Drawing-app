import React from 'react';
import { FaPaintBrush, FaRegCircle ,FaEraser } from 'react-icons/fa';
import { RiRectangleLine } from 'react-icons/ri';
import {LuHexagon} from'react-icons/lu'
import { IoTriangleOutline , IoTextOutline } from 'react-icons/io5';

const DrawingTools = ({ startDrawing, addShape, addText ,handleEraser,  fillColor, setFillColor }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button onClick={startDrawing} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"> <FaPaintBrush /> </button>
      <button onClick={handleEraser} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"> <FaEraser /> </button>
      
      <button onClick={() => addShape('rectangle')} className="text-[#FF9119] -700 border border-[#FF9119] -700 hover:bg-[#FF9119] -700 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#FF9119] -300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-[#FF9119] -500 dark:text-[#FF9119] -500 dark:hover:text-white dark:focus:ring-[#FF9119] -800 dark:hover:bg-[#FF9119] -500"> <RiRectangleLine /> </button>
      <button onClick={() => addShape('circle')} className="text-[#FF9119] -700 border border-[#FF9119] -700 hover:bg-[#FF9119] -700 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#FF9119] -300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-[#FF9119] -500 dark:text-[#FF9119] -500 dark:hover:text-white dark:focus:ring-[#FF9119] -800 dark:hover:bg-[#FF9119] -500"> <FaRegCircle /> </button>
      <button onClick={() => addShape('triangle')} className="text-[#FF9119] -700 border border-[#FF9119] -700 hover:bg-[#FF9119] -700 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#FF9119] -300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-[#FF9119] -500 dark:text-[#FF9119] -500 dark:hover:text-white dark:focus:ring-[#FF9119] -800 dark:hover:bg-[#FF9119] -500"> <IoTriangleOutline /> </button>
      <button onClick={() => addShape('line')} className="text-[#FF9119] -700 border border-[#FF9119] -700 hover:bg-[#FF9119] -700 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#FF9119] -300 font-medium rounded-lg text-sm p-2.5 px-3 text-center inline-flex items-center me-2 dark:border-[#FF9119] -500 dark:text-[#FF9119] -500 dark:hover:text-white dark:focus:ring-[#FF9119] -800 dark:hover:bg-[#FF9119] -500"> / </button>
      <button onClick={() => addShape('polygon')} className="text-[#FF9119] -700 border border-[#FF9119] -700 hover:bg-[#FF9119] -700 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#FF9119] -300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-[#FF9119] -500 dark:text-[#FF9119] -500 dark:hover:text-white dark:focus:ring-[#FF9119] -800 dark:hover:bg-[#FF9119] -500"> <LuHexagon /> </button>
      <label className="flex items-center s rounded-full">
        <input
          type="checkbox"
          checked={fillColor}
          onChange={() => setFillColor(!fillColor)}
          className="px-5"
        />
        <span>Fill</span>
      </label>
      <button onClick={addText} className='text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500 mr-1'>< IoTextOutline/></button>
    </div>
  );
};

export default DrawingTools;



