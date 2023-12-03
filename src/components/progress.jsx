import './styles.css';

export default function Progress({ currentWordIndex, totalWordCount }) {
  return (
    <div className='progress'>
      <div>
        {currentWordIndex} / {totalWordCount}
      </div>
    </div>
  );
}
