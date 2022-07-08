import React, { useState, useRef, useEffect, createContext } from 'react';
import ReactTest from './components/reactTest';

export const UserContext = createContext();

const App = () => {
  //useState
  const [count, setCount] = useState(0);
  const [array, setArray] = useState(['dog', 'cat']);
  const [FizzBuzz, setFizzBuzz] = useState('FizzBuzz Counter');

  const [target, setJudge] = useState(false);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  useEffect(() => {
    console.log(target);
  }, [target]);

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setJudge(true);
      } else {
        setJudge(false);
        return;
      }
    });
  }, options);

  useEffect(() => {
    const targetElements = document.querySelector('.observer');
    console.log(targetElements);
    observer.observe(targetElements);
  }, []);

  const textRef = useRef(null);

  const addArray = (item) => {
    const temporaryArray = array;
    temporaryArray.push(item);
    setArray(temporaryArray);
    console.log(array);
  };
  const addArrayVisibility = (item) => {
    setArray([...array, item]);
  };

  //useEffect
  // 第2引数について
  // 省略した場合: コンポーネントがレンダリングされるたびに実行される → コンポーネントがレンダリングされるたびに関数が実行されるため気をつけないと無限ループになるためできるだけ第2引数は省略しないようにする
  // 空の配列を入れた場合[]: 最初の1回のみ実行される
  // 配列の中に定義した変数を入れる場合: 変数に変更があった場合実行される
  // *配列の中に入れた変数をuseStateのset関数で変更する場合無限ループになるため注意
  useEffect(() => {
    if (count % 3 === 0 && count % 5 === 0) {
      setFizzBuzz('FizzBuzz');
    } else if (count % 3 === 0) {
      setFizzBuzz('Fizz');
    } else if (count % 5 === 0) {
      setFizzBuzz('Buzz');
    } else {
      setFizzBuzz(count);
    }
  }, [count]);

  // context( useContext, createContext )
  // createContextはconst Appの外で定義する
  const [user, setUser] = useState({
    name: 'john doe',
    age: '20',
    job: 'police',
  });

  return (
    <div>
      React App file
      <div>{array.join(', ')}</div>
      <input ref={textRef} type="text" />
      <button type="button" onClick={() => addArray(textRef.current.value)}>
        配列に追加(描画されない)
      </button>
      <button type="button" onClick={() => addArrayVisibility(textRef.current.value)}>
        配列に追加(描画される)
      </button>
      <div>
        {/* count++がダメな理由はcountの値を変更する場合はsetCountを使用して変更する必要がありcount++の場合はsetCountの関数によってではなく++の再代入によって変数を変更しようとしたため */}
        <button onClick={() => setCount(count + 1)}>カウントアップ</button>
      </div>
      <div>{count}</div>
      <div>{FizzBuzz}</div>
      <div>
        <UserContext.Provider value={user}>
          <ReactTest />
        </UserContext.Provider>
      </div>
      <button type="button" onClick={() => setUser({ ...user, job: 'firefighter' })}>
        Job Change for Firefighter
      </button>
      <div className="observer" style={{ margin: '1000px 0' }}>
        この要素
      </div>
    </div>
  );
};

export default App;
