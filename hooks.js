const { useState } = require("react")

const HookSwitcher = () => {

  const [color, setColor] = useState('white');

  const setDark = () => setColor('black');
  const setLight = () => setColor('white');

  return (
    <div style={{ padding: '10px', backgroundColor: color}}>
      <button onClick={() => setDark}></button>
      <button onClick={setLight}></button>
    </div>
  );



}