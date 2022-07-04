import React, { useState, useRef } from 'react';
import ReactTest from './components/reactTest';

const App = () => {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState(['dog', 'cat']);

  const textRef = useRef(null);

  const addArray = (item) => {
    const temporaryArray = array;
    temporaryArray.push(item);
    setArray(temporaryArray);
  };
  const addArrayVisibility = (item) => {
    setArray([...array, item]);
  }

  return (
    <div>
      React App file
      <ReactTest />
      <div>{array.join(', ')}</div>
      <input ref={textRef} type="text" />
      <button type="button" onClick={() => addArray(textRef.current.value)}>
        配列に追加(描画されない)
      </button>
      <button type='button' onClick={() => addArrayVisibility(textRef.current.value)}>配列に追加(描画される)</button>
      <div>
        {/* count++がダメな理由はcountの値を変更する場合はsetCountを使用して変更する必要がありcount++の場合はsetCountの関数によってではなく++の再代入によって変数を変更しようとしたため */}
        <button onClick={() => setCount(count + 1)}>カウントアップ</button>
      </div>
      {/* <button onClick={() => console.log(setCount)}>setCountの関数</button> */}
      {/* <div>{count}</div> */}
    </div>
  );
};

export default App;
