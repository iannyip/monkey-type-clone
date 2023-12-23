import './styles.css';
export default function NewPara({ hasPassed, inputWord }) {
  // This will be a div that fills up the entire width of the
  // Pressing enter will move it past.
  const isCorrect = inputWord === '?n';
  const letterStyle = {
    color: isCorrect ? '#d1d0c5' : '#ca4754',
  };

  return (
    <>
      <div className='enter-symbol'>
        {!hasPassed && <span>↲</span>}
        {hasPassed && <span style={letterStyle}>↲</span>}
      </div>
      <div className='new-para' />
    </>
  );
}
