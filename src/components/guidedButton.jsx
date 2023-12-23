import './styles.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function GuidedButton({ guidedMode, updateGuidedMode }) {
  const handleBtnToggle = (event) => {
    updateGuidedMode(event.target.checked);
  };

  const visibilityOnStyle = {
    color: guidedMode ? '#FFFFFF' : '#808080',
    transition: '0.4s',
    '-webkit-transition': '0.4s',
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
