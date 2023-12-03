import { useEffect, useState } from 'react';
import Word from './word';
import './styles.css';
import fetchPassage from '../lib/verse';
import { getLoremIpsumWords, getLoremIpsumParagraphs } from '../lib/lorem';
import Progress from './progress';

export default function Passage({ passage }) {
  const [referenceText, setReferenceText] = useState('');
  const [inputArr, setInputArr] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // These are for handling moving of passage
  const [firstRowWordIndex, setFirstRowWordIndex] = useState(0);
  const [firstRowYPosition, setFirstRowYPosition] = useState(0);
  const [secondRowWordIndex, setSecondRowWordIndex] = useState(0);
  const [secondRowYPosition, setSecondRowYPosition] = useState(0);

  // handles shifting of text / removal of first row of text
  const updateCursorYPosition = (yValue) => {
    if (firstRowYPosition === 0) {
      // set first row for the first time
      setFirstRowYPosition(yValue);
    } else if (secondRowYPosition === 0 && yValue > firstRowYPosition) {
      // set second row for the first time
      setSecondRowYPosition(yValue);
      setSecondRowWordIndex(currentWordIndex);
    } else if (yValue > secondRowYPosition && secondRowYPosition > 0) {
      setFirstRowWordIndex(secondRowWordIndex);
      setSecondRowWordIndex(currentWordIndex);
    }
  };

  // First useEffect to set text
  useEffect(() => {
    // setReferenceText(getLoremIpsumWords(40));
    const samplePara = getLoremIpsumParagraphs(2);
    // console.log(samplePara);
    setReferenceText(samplePara);
  }, []);

  // Second useEffect to handle input
  useEffect(() => {
    // Checks for text input
    const validateAndUpdateInput = (event) => {
      setCurrentWord(currentWord + `${event.key}`);
      setInputArr([
        ...inputArr.slice(0, inputArr.length - 1),
        currentWord + `${event.key}`,
      ]);
    };

    // handles spacebars
    const handleSpacebar = (event) => {
      if (currentWord.length > 0) {
        setInputArr([...inputArr, '']);
        setCurrentWord('');
        setCurrentWordIndex(currentWordIndex + 1);
      }
    };

    const handleBackspace = () => {
      if (currentWord.length > 0) {
        setCurrentWord(currentWord.slice(0, currentWord.length - 1));
        setInputArr([
          ...inputArr.slice(0, inputArr.length - 1),
          currentWord.slice(0, currentWord.length - 1),
        ]);
      } else {
        setCurrentWordIndex(currentWordIndex - 1);
        setCurrentWord(inputArr[currentWordIndex - 1]);
        setInputArr([...inputArr.slice(0, inputArr.length - 1)]);
      }
    };

    const handleKeyDown = (event) => {
      // console.log(`----- User pressed: ${event.code}, ${event.key}`);
      const regex = /^[a-zA-Z0-9\W]$/;
      if (event.key.match(/\s/g)) {
        handleSpacebar();
      } else if (event.key.match(regex)) {
        event.preventDefault();
        validateAndUpdateInput(event);
      }
      if (event.key.match(/Backspace/g)) {
        handleBackspace();
      }
    };

    //
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className='type-container'>
      <Progress
        currentWordIndex={currentWordIndex}
        totalWordCount={passage.split(' ').length}
      />
      <div className='passage-container'>
        {passage.split(' ').map((word, index) => {
          return (
            index >= firstRowWordIndex && (
              <Word
                key={`${word}-${index}`}
                wordIndex={index}
                correctWord={word}
                inputWord={index <= currentWordIndex ? inputArr[index] : []}
                isActive={index === currentWordIndex}
                updateCursorYPosition={updateCursorYPosition}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
