import { useState, useEffect } from 'react';
import Passage from './components/passage';
import PassageSelector from './components/passageSelector';
import { getLoremIpsumWords, getLoremIpsumParagraphs } from './lib/lorem';
import fetchPassage from './lib/verse';
import './App.css';

function App() {
  const [passage, setPassage] = useState('');
  const [reference, setReference] = useState('Lorem Ipsum');

  useEffect(() => {
    const samplePara = getLoremIpsumParagraphs(2);
    // console.log(samplePara);
    setPassage(samplePara);
  }, []);

  useEffect(() => {
    // when the reference changes
    if (reference !== 'Lorem Ipsum') {
      console.log('fetching new passage!');
      fetchPassage(reference).then((data) => {
        console.log(data);
        setPassage(data);
      });
    }
  }, [reference]);

  const updateReference = (newReference) => {
    setReference(newReference);
  };

  return (
    <div className='App'>
      <div className='App-body'>
        <div className='header'>
          <PassageSelector
            reference={reference}
            updateReference={updateReference}
          />
        </div>
        <Passage passage={passage} />
        <div className='footer'></div>
      </div>
    </div>
  );
}

export default App;
