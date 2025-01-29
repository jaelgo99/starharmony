import React from 'react';

const ChordWheel = ({ 
  showSevenths, 
  setShowSevenths, 
  selectedDegree, 
  setSelectedDegree,
  scale,
  scaleDefaults
}) => {
  const currentScale = scaleDefaults[scale];
  const sections = currentScale.degrees.map(degree => {
    if (showSevenths) {
      const seventhType = currentScale.chords[degree].seventh;
      if (seventhType === 'Dom7') return `${degree}7`;
      if (seventhType === 'Maj7') return `${degree}maj7`;
      if (seventhType === 'Min7') return `${degree}min7`;
      if (seventhType === 'ø7') return `${degree}ø7`;
      if (seventhType === '°7') return `${degree}°7`;
      return `${degree}7`;
    }
    return degree;
  });
    
  const sectionAngle = 360 / sections.length;
  
  const getCoordinates = (angle, radius) => {
    const angleRad = (angle - 90) * (Math.PI / 180);
    return {
      x: 100 + radius * Math.cos(angleRad),
      y: 100 + radius * Math.sin(angleRad)
    };
  };

  const createSectionPath = (index) => {
    const startAngle = index * sectionAngle;
    const endAngle = (index + 1) * sectionAngle;
    const start = getCoordinates(startAngle, 85);
    const end = getCoordinates(endAngle, 85);
    const textPoint = getCoordinates(startAngle + sectionAngle / 2, 55);
    const largeArcFlag = sectionAngle > 180 ? 1 : 0;
    
    const pathData = [
      `M 100 100`,
      `L ${start.x} ${start.y}`,
      `A 85 85 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      'Z'
    ].join(' ');

    return {
      path: pathData,
      textX: textPoint.x,
      textY: textPoint.y
    };
  };

  const handleSectionClick = (section) => {
    const degree = showSevenths 
      ? section.replace(/maj7|min7|7|ø7|°7/g, '')
      : section;
    setSelectedDegree(selectedDegree === degree ? null : degree);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center items-center w-full min-h-[240px]">
        <svg viewBox="0 0 200 200" className="w-56 h-56">
          <g className="transform translate-0">
            {sections.map((section, index) => {
              const { path, textX, textY } = createSectionPath(index);
              const degree = showSevenths 
                ? section.replace(/maj7|min7|7|ø7|°7/g, '')
                : section;
              const isSelected = selectedDegree === degree;
              
              return (
                <g 
                  key={section} 
                  className="group cursor-pointer"
                  onClick={() => handleSectionClick(section)}
                >
                  <path
                    d={path}
                    className={`
                      stroke-gray-300 transition-colors duration-200
                      ${isSelected 
                        ? 'fill-gray-700' 
                        : 'fill-gray-50 group-hover:fill-gray-200'
                      }
                    `}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`
                      transition-colors duration-200 text-sm
                      ${isSelected 
                        ? 'fill-gray-50' 
                        : 'fill-gray-700 group-hover:fill-gray-900'
                      }
                    `}
                  >
                    {section}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">7th Chords</span>
        <button
          onClick={() => setShowSevenths(!showSevenths)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
            showSevenths ? 'bg-gray-700' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
              showSevenths ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ChordWheel;