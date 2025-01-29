import * as React from "react";
import { useState, useRef, useEffect } from "react";

function SmallKnobControl({ label, value, min = 0, max = 100, onChange }) {
  const knobRef = useRef(null);
  const [rotation, setRotation] = useState(225);
  const [isDragging, setIsDragging] = useState(false);
  const [currentValue, setCurrentValue] = useState(parseFloat(value));
  const [startY, setStartY] = useState(0);

  useEffect(() => {
    // Add the no-select class to the document body when component mounts
    document.body.classList.add('no-select');
    
    // Create and inject required CSS if it doesn't exist
    if (!document.querySelector('#knob-control-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'knob-control-styles';
      styleSheet.textContent = `
        .no-select {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
      `;
      document.head.appendChild(styleSheet);
    }

    return () => {
      // Remove the no-select class when component unmounts
      document.body.classList.remove('no-select');
    };
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartY(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Focus only on vertical movement, ignore radius constraints
    const sensitivity = 1.75;
    let newRotation = rotation - (e.clientY - startY) * sensitivity;

    // Clamp rotation values
    newRotation = Math.max(225, Math.min(495, newRotation));
    
    setRotation(newRotation);
    const normalizedRotation = newRotation - 225;
    const newValue = Math.round(((normalizedRotation / 270) * (max - min)) + min);
    setCurrentValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
    
    // Update startY for smoother continuous movement
    setStartY(e.clientY);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, rotation]);

  useEffect(() => {
    setCurrentValue(parseFloat(value));
    const initialRotation = 225 + ((parseFloat(value) - min) / (max - min)) * 270;
    setRotation(initialRotation);
  }, [value, min, max]);

  return (
    <div className="flex flex-col self-stretch my-auto w-16">
      <div className="flex z-10 flex-col min-h-[92px]">
        <div className="text-xs font-medium leading-4 text-center text-gray-700 uppercase">
          {label}
        </div>
        <div className="flex flex-col justify-center self-center py-px mt-1 w-7">
          <div
            ref={knobRef}
            onMouseDown={handleMouseDown}
            className="flex flex-col items-center px-1.5 pb-5 w-full h-7 bg-gray-100 rounded-full border-2 border-gray-300 border-solid cursor-grab active:cursor-grabbing"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div 
              className="flex z-10 shrink-0 w-1 h-2 bg-gray-700 rounded-sm"
              style={{ transform: `rotate(0deg)` }}
            />
          </div>
        </div>
        <div className="mt-1 text-xs tracking-tighter text-center text-gray-700">
          {currentValue}
        </div>
      </div>
    </div>
  );
}

export default SmallKnobControl;