export default function GuidedButton({ guidedMode, updateGuidedMode }) {
  const handleBtnToggle = (event) => {
    updateGuidedMode();
  };

  return (
    <div>
      <button onClick={handleBtnToggle}>
        {guidedMode ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}
