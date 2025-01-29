import * as React from "react";
import { useState, useRef, useEffect } from "react";

function DiscreteKnobControl({ 
  label, 
  value, 
  size = "large",
  onChange,
  options = []
}) {
  const isLarge = size === "large";
  const isMedium = size === "medium";
  const knobRef = useRef(null);
  const [rotation, setRotation] = useState(225);
  const [isDragging, setIsDragging] = useState(false);
  const [currentValue, setCurrentValue] = useState(options[0]);
  const [startY, setStartY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.body.classList.add('no-select');
    
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
    
    // Calculate movement
    const sensitivity = 1;
    const deltaY = (startY - e.clientY) * sensitivity;
    
    // Update index based on movement
    const stepThreshold = 10; // Pixels needed to move to next/prev value
    if (Math.abs(deltaY) > stepThreshold) {
      let newIndex = currentIndex;
      if (deltaY > 0 && currentIndex < options.length - 1) {
        newIndex = currentIndex + 1;
      } else if (deltaY < 0 && currentIndex > 0) {
        newIndex = currentIndex - 1;
      }
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        setCurrentValue(options[newIndex]);
        // Calculate rotation angle based on index
        const totalRange = 270; // Total rotation range
        const stepRotation = totalRange / (options.length - 1);
        const newRotation = 225 + (stepRotation * newIndex);
        setRotation(newRotation);
        
        if (onChange) {
          onChange(options[newIndex]);
        }
        
        // Reset startY to current position
        setStartY(e.clientY);
      }
    }
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
  }, [isDragging, currentIndex]);

  // Initialize with the provided value
  useEffect(() => {
    const index = options.indexOf(value);
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentValue(value);
      const totalRange = 270;
      const stepRotation = totalRange / (options.length - 1);
      setRotation(225 + (stepRotation * index));
    }
  }, [value, options]);

  const getKnobStyles = () => {
    if (isLarge) {
      return {
        container: "w-[62px]",
        knob: "w-16 h-16 px-3.5 pt-1 pb-12",
        line: "h-[11px]"
      };
    }
    if (isMedium) {
      return {
        container: "w-[48px]",
        knob: "w-12 h-12 px-2.5 pt-1 pb-9",
        line: "h-[9px]"
      };
    }
    return {
      container: "w-[32px]",
      knob: "w-7 h-7 px-1.5 pt-0.5 pb-6",
      line: "h-[7px]"
    };
  };

  const styles = getKnobStyles();

  return (
    <div className={`flex flex-col grow shrink ${styles.container}`}>
      <div className="flex z-10 flex-col">
        <div className="text-xs font-medium leading-4 text-center text-black uppercase">
          {label}
        </div>
        <div className="flex flex-col flex-1 justify-center py-px mt-2 w-full">
          <div
            ref={knobRef}
            onMouseDown={handleMouseDown}
            className={`flex flex-col items-center ${styles.knob} bg-gray-100 rounded-full border-2 border-gray-300 border-solid cursor-grab active:cursor-grabbing`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div
              className={`flex shrink-0 w-1 bg-gray-700 rounded ${styles.line} origin-bottom`}
              style={{ transform: `rotate(0deg)` }}
            />
          </div>
        </div>
      </div>
      <div className="z-10 self-center text-xs tracking-tighter text-center text-gray-700">
        {currentValue}
      </div>
    </div>
  );
}

export default DiscreteKnobControl;