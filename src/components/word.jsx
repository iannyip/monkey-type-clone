import Letter from './letter';
import './styles.css';

export default function Word({
  wordIndex,
  correctWord,
  inputWord,
  isActive,
  updateCursorYPosition,
}) {
  // console.log(updateCursorYPosition);
  return (
    <>
      <div className='word'>
        {[...correctWord].map((letter, index) => (
          <Letter
            key={`${wordIndex}-${letter}-${index}`}
            letter={letter}
            isSet={!!inputWord ? inputWord[index] : false}
            isCorrect={!!inputWord ? letter === inputWord[index] : false}
            isActive={!!inputWord && index + 1 === inputWord.length && isActive}
            updateCursorYPosition={updateCursorYPosition}
          />
        ))}
        {!!inputWord &&
          [...inputWord.slice(correctWord.length)].map((letter, index) => {
            // console.log('extra word rendering');
            return (
              <Letter
                key={`${wordIndex}-extra-${letter}-${index}`}
                letter={letter}
                isSet={true}
                isCorrect={false}
                updateCursorYPosition={updateCursorYPosition}
              />
            );
          })}
      </div>
    </>
  );
}
