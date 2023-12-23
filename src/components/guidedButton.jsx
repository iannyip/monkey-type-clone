import { useEffect } from 'react';
import './styles.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function GuidedButton({ guidedMode, updateGuidedMode }) {
  // This useEffect handles the bug where spacebar toggles the checkbox. Looks for the checkbox and sets an event listener to disable (blur) it after it has been clicked
  useEffect(() => {
    const toggle = document.getElementById('visibility-toggle');

    toggle.addEventListener('click', () => {
      toggle.blur();
    });
    return () => {
      document.removeEventListener('keydown', () => {
        toggle.blur();
      });
    };
  });

  const handleBtnToggle = (event) => {
    updateGuidedMode(event.target.checked);
  };

  const visibilityOnStyle = {
    color: guidedMode ? '#FFFFFF' : '#808080',
    transition: '0.4s',
    WebkitTransition: '0.4s',
  };

  const visibilityOffStyle = {
    ...visibilityOnStyle,
    color: !guidedMode ? '#FFFFFF' : '#808080',
  };

  return (
    <div className='guided-toggle-container'>
      <span>
        <VisibilityOffIcon fontSize='small' style={visibilityOffStyle} />
      </span>
      <label className='switch'>
        <input
          onChange={handleBtnToggle}
          id='visibility-toggle'
          type='checkbox'
          defaultChecked='checked'
        />
        <span className='slider'></span>
      </label>
      <span>
        <VisibilityIcon fontSize='small' style={visibilityOnStyle} />
      </span>
    </div>
  );
}
