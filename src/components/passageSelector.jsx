import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import biblejs from 'biblejs';
import './styles.css';

function SecondaryMenuItem({ chapter, chapterNumber, updateReference }) {
  return (
    <span
      className='secondary-menu-item'
      onClick={() => {
        updateReference(`${chapter} ${chapterNumber}`);
      }}
    >
      {chapterNumber}
    </span>
  );
}

function PrimaryMenuItem({ name, chapters, updateReference }) {
  // const [isSelected, setIsSelected] = useState(false);
  const [showSecondaryMenuItems, setShowSecondaryMenuItems] = useState(false);

  const handleClick = () => {
    setShowSecondaryMenuItems(!showSecondaryMenuItems);
  };

  return (
    <>
      <div className='primary-menu-item' onClick={handleClick}>
        <div className='primary-menu-text'>{name}</div>
        <ExpandMoreIcon className='primary-menu-arrow' />
      </div>
      {showSecondaryMenuItems && (
        <div className='secondary-menu-container'>
          <div className='secondary-menu'>
            {Array.from(Array(chapters).keys()).map((num) => {
              return (
                <SecondaryMenuItem
                  key={num}
                  chapter={name}
                  chapterNumber={num + 1}
                  updateReference={updateReference}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default function PassageSelector({ reference, updateReference }) {
  const [displayText, setDisplayText] = useState('Lorem Ipsum');
  const [showMenu, setShowMenu] = useState(false);
  const [primaryMenuItems, setPrimaryMenuItems] = useState([]);

  const menuClickHandler = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [reference]);

  useEffect(() => {
    const bibleBooks = biblejs.Books.map((book) => {
      return {
        name: book.names[0][0].match(/[0-9]/g) ? book.names[1] : book.names[0],
        chapters: book.verses.length,
      };
    });
    setPrimaryMenuItems(bibleBooks);
  }, []);

  return (
    <>
      {showMenu && (
        <div className='menu'>
          {primaryMenuItems.map((book, index) => (
            <PrimaryMenuItem
              key={(index, book.name)}
              name={book.name}
              chapters={book.chapters}
              updateReference={updateReference}
            />
          ))}
        </div>
      )}
      <div className='passage-selector' onClick={menuClickHandler}>
        {reference}
      </div>
    </>
  );
}
