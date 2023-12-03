import { useEffect, useRef } from 'react';
import './styles.css';

export default function Letter({
  letter,
  isSet,
  isCorrect,
  isActive,
  updateCursorYPosition,
}) {
  const letterStyle = {
    color: isCorrect ? '#d1d0c5' : '#ca4754',
  };
  const cursorRef = useRef(0);

  useEffect(() => {
    if (isActive && cursorRef.current) {
      // console.log(letter);
      // console.log(cursorRef.current?.getBoundingClientRect());
      // console.log(cursorRef.current?.getBoundingClientRect().y);
      updateCursorYPosition(cursorRef.current?.getBoundingClientRect().y);
    }
  }, [isActive, cursorRef]);

  return (
    <div className='letter'>
      {isSet && <div style={letterStyle}>{letter}</div>}
      {isActive && (
        <div ref={cursorRef} className={isActive ? 'cursor' : undefined} />
      )}
      {!isSet && <div>{letter}</div>}
    </div>
  );
}
