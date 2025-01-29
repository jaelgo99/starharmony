import React, { useState } from 'react';
import Header from './Header';
import ChordWheel from './ChordWheel';
import ChordDisplay from './ChordDisplay';
import ArpSection from './ArpSection';
import SequencerSection from './SequencerSection';

const ChordLogicContainer = () => {
  const [showSevenths, setShowSevenths] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState('I');
  const [rootNote, setRootNote] = useState('C');
  const [scale, setScale] = useState('Major');
  const [selectedChordType, setSelectedChordType] = useState('Maj');
  const [showExtendedChords, setShowExtendedChords] = useState(false);

  const extendedChords = [
    // Suspended chords
    "sus2", "sus4", "sus2sus4",
    // Add chords
    "add9", "add11", "add13",
    // Extended dominants
    "9", "11", "13",
    // Extended major chords
    "Maj9", "Maj11", "Maj13",
    // Extended minor chords
    "Min9", "Min11", "Min13",
    // Altered dominants
    "7#5", "7b5", "7#9", "7b9"
  ];

  // Scale definitions with chord qualities
  const scaleDefaults = {
    'Major': {
      degrees: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
      intervals: [0, 2, 4, 5, 7, 9, 11],
      chords: {
        'I': { default: 'Maj', seventh: 'Maj7' },
        'ii': { default: 'Min', seventh: 'Min7' },
        'iii': { default: 'Min', seventh: 'Min7' },
        'IV': { default: 'Maj', seventh: 'Maj7' },
        'V': { default: 'Dom', seventh: 'Dom7' },
        'vi': { default: 'Min', seventh: 'Min7' },
        'vii°': { default: 'Dim', seventh: 'ø7' }
      }
    },
    'Minor': {
      degrees: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
      intervals: [0, 2, 3, 5, 7, 8, 10],
      chords: {
        'i': { default: 'Min', seventh: 'Min7' },
        'ii°': { default: 'Dim', seventh: 'ø7' },
        'III': { default: 'Maj', seventh: 'Maj7' },
        'iv': { default: 'Min', seventh: 'Min7' },
        'v': { default: 'Min', seventh: 'Min7' },
        'VI': { default: 'Maj', seventh: 'Maj7' },
        'VII': { default: 'Maj', seventh: 'Dom7' }
      }
    },
    'Harmonic Minor': {
      degrees: ['i', 'ii°', 'III+', 'iv', 'V', 'VI', 'vii°'],
      intervals: [0, 2, 3, 5, 7, 8, 11],
      chords: {
        'i': { default: 'Min', seventh: 'Min/Maj7' },
        'ii°': { default: 'Dim', seventh: '°7' },
        'III+': { default: 'Aug', seventh: 'Maj7' },
        'iv': { default: 'Min', seventh: 'Min7' },
        'V': { default: 'Maj', seventh: 'Dom7' },
        'VI': { default: 'Maj', seventh: 'Maj7' },
        'vii°': { default: 'Dim', seventh: '°7' }
      }
    }
  };

  // Calculate actual notes from scale degrees based on root note and scale
  const getNoteFromDegree = (root, degree) => {
    const notes = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
    const currentScale = scaleDefaults[scale];
    const degreeIndex = currentScale.degrees.indexOf(degree);
    
    // If no degree or invalid degree, return root note
    if (degreeIndex === -1) return root;
    
    // Find the root note index
    const rootIndex = notes.indexOf(root);
    if (rootIndex === -1) return root; // Invalid root note
    
    // Calculate the actual note using the scale intervals
    const noteIndex = (rootIndex + currentScale.intervals[degreeIndex]) % 12;
    
    return notes[noteIndex];
  };

  // Update selected degree when scale changes to ensure it's valid
  React.useEffect(() => {
    const currentScale = scaleDefaults[scale];
    if (currentScale && !currentScale.degrees.includes(selectedDegree)) {
      setSelectedDegree(currentScale.degrees[0]);
    }
  }, [scale]);

  // Get default chord type based on degree and scale
  React.useEffect(() => {
    if (selectedDegree && scaleDefaults[scale]?.chords[selectedDegree]) {
      const defaultType = showSevenths 
        ? scaleDefaults[scale].chords[selectedDegree].seventh
        : scaleDefaults[scale].chords[selectedDegree].default;
      setSelectedChordType(defaultType);
    }
  }, [selectedDegree, showSevenths, scale]);

  // Calculate displayed chord name
  const getDisplayedChord = () => {
    // If no degree is selected, show root note with appropriate default quality
    if (!selectedDegree) {
      const defaultQuality = scale === 'Minor' ? 'Min' : 'Maj';
      return `${rootNote}${defaultQuality}${showSevenths ? '7' : ''}`;
    }
    
    // Get the note based on root note and scale degree
    const note = getNoteFromDegree(rootNote, selectedDegree);
    
    // Safely get the chord type
    const currentScaleChords = scaleDefaults[scale]?.chords || {};
    const currentDegreeChords = currentScaleChords[selectedDegree] || { default: 'Maj', seventh: 'Maj7' };
    const defaultType = currentDegreeChords[showSevenths ? 'seventh' : 'default'];
    const chordType = selectedChordType || defaultType;
    
    const shouldAddSeven = showSevenths && 
      chordType !== '+' && 
      !chordType.includes('7') &&
      !chordType.includes('ø') &&
      !chordType.includes('9') &&
      !chordType.includes('11') &&
      !chordType.includes('13');
    
    return `${note}${chordType}${shouldAddSeven ? '7' : ''}`;
  };

  return (
    <div className="flex flex-col justify-center self-stretch p-2 my-auto min-w-[240px] w-[648px] max-md:max-w-full h-full">
      <div className="flex overflow-visible flex-col pb-2 w-full bg-white rounded border border-gray-300 border-solid shadow-md h-full max-md:max-w-full">
        <Header 
          rootNote={rootNote}
          setRootNote={setRootNote}
          scale={scale}
          setScale={setScale}
        />
        <div className="flex flex-col flex-1 px-4 w-full max-md:max-w-full">
          <div className="flex flex-col flex-1 pt-4 w-full rounded-sm max-md:max-w-full">
            <div className="flex flex-wrap flex-1 gap-6 pt-1 size-full max-md:max-w-full">
              <div className="flex flex-row grow shrink gap-8 h-full text-center whitespace-nowrap min-w-[240px] w-[367px] justify-center overflow-visible">
                <ChordWheel 
                  showSevenths={showSevenths}
                  setShowSevenths={setShowSevenths}
                  selectedDegree={selectedDegree}
                  setSelectedDegree={setSelectedDegree}
                  scale={scale}
                  scaleDefaults={scaleDefaults}
                />
                <ChordDisplay 
                  showSevenths={showSevenths}
                  displayedChord={getDisplayedChord()}
                  selectedChordType={selectedChordType}
                  setSelectedChordType={setSelectedChordType}
                  defaultChordType={selectedDegree && scaleDefaults[scale]?.chords[selectedDegree] ? 
                    (showSevenths 
                      ? scaleDefaults[scale].chords[selectedDegree].seventh
                      : scaleDefaults[scale].chords[selectedDegree].default)
                    : null}
                  showExtendedChords={showExtendedChords}
                  setShowExtendedChords={setShowExtendedChords}
                  extendedChords={extendedChords}
                />
              </div>
              <ArpSection />
            </div>
          </div>
          <SequencerSection rootNote={rootNote} scale={scale} />
        </div>
      </div>
    </div>
  );
};

export default ChordLogicContainer;