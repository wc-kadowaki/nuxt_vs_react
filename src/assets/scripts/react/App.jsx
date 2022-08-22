import axios from 'axios';
import React, { useState, useRef, useEffect, createContext, useReducer, useCallback } from 'react';
import ReactTest from './components/reactTest';
import { weatherCode } from '@scripts/weather-code';
import Counter from './components/Counter';

export const UserContext = createContext();

const App = () => {
  //useState
  const [count, setCount] = useState(0);
  const [count99, setCount99] = useState(0);
  const [array, setArray] = useState(['dog', 'cat']);
  const [FizzBuzz, setFizzBuzz] = useState('FizzBuzz Counter');

  const [target, setJudge] = useState(false);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const double = () => {
    let i = 2;

    setCount(count + i)

    const temp = count
    console.log(temp)

    return temp
  }

  console.log(count99)

  // const testTemp = double(count);

  useEffect(() => {}, [target]);

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
    observer.observe(targetElements);
  }, []);

  const textRef = useRef(null);

  const addArray = (item) => {
    const temporaryArray = array;
    temporaryArray.push(item);
    setArray(temporaryArray);
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

  // useReducer
  const initialState = {
    isLoading: true,
    post: {},
    isError: '',
  };
  const reduceFunction = (dataState, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          isLoading: false,
          post: action.payload,
          isError: '',
        };
      case 'FETCH_ERROR':
        return {
          isLoading: false,
          post: {},
          isError: '読み込みに失敗しました',
        };
      default:
        return dataState;
    }
  };
  const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo';
  const [dataState, dispatch] = useReducer(reduceFunction, initialState);
  const requireWeather = () => {
    axios
      .get(weatherApiUrl)
      .then((response) => {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data,
        });
      })
      .catch(() => {
        dispatch({
          type: 'FETCH_ERROR',
        });
      });
  };
  useEffect(() => {
    requireWeather();
  }, []);

  const loading = () => {
    if (dataState.isLoading) {
      return <div>読み込み中</div>;
    } else {
      return <div>読み込み完了</div>;
    }
  };
  const loadingElement = loading();

  const weatherData = () => {
    if (!dataState.isLoading && dataState.isError === '') {
      const data = [];
      for (let i = 0; i < dataState.post.daily.time.length; i++) {
        const weatherObject = {
          time: dataState.post.daily.time[i],
          temperature_2m_max: dataState.post.daily.temperature_2m_max[i],
          temperature_2m_min: dataState.post.daily.temperature_2m_min[i],
          weathercode: weatherCode[dataState.post.daily.weathercode[i]],
        };
        data.push(weatherObject);
      }
      const weatherDataList = data.map((dailyWeather) => (
        <li key={dailyWeather.time}>
          <div>日にち：{dailyWeather.time}</div>
          <div>最高気温：{dailyWeather.temperature_2m_max}</div>
          <div>最低気温：{dailyWeather.temperature_2m_min}</div>
          <div>天気：{dailyWeather.weathercode}</div>
        </li>
      ));
      console.log(weatherDataList);
      return (
        <div>
          <div>データ取得できた時の表示</div>
          <ul>{weatherDataList}</ul>
        </div>
      );
    } else if (dataState.isLoading && dataState.isError === '') {
      return <div>データ取得中の表示(初期表示)</div>;
    } else {
      return <div>データ取得できなかった時の表示{dataState.isError}</div>;
    }
  };
  const [weatherState, setWeatherElement] = useState(weatherData);
  useEffect(() => {
    setWeatherElement(weatherData());
  }, [dataState]);

  // useCallback, useMemo, React.memo
  // 全てパフォーマンスの向上に関わるもので
  // React.memoはコンポーネントをメモ化する
  // useCallbackは関数をメモ化する
  // useMemoは関数の返り値をメモ化する
  // React.memoで子コンポーネントをメモ化した際にpropsで関数を引数にする場合渡す関数にuseCallbackを使用しないと
  // 親コンポーネントが再レンダリングされた際に同じ処理でも別の関数と判定されてしまうため子コンポーネントでReact.memoを使用していても際レンダリングされてしまう
  // これって関数だけなのか？propsで変数を渡して見た場合も際レンダリングされるのか？

  const Child = React.memo(({ buttonClick }) => {
    return (
      <div>
        <div>子コンポーネント</div>
        <button
          onClick={() => {
            buttonClick();
          }}
        >
          ボタン
        </button>
      </div>
    );
  });

  const Child2 = React.memo(({ buttonClick }) => {
    return (
      <div>
        <div>子コンポーネント2</div>
        <button
          onClick={() => {
            buttonClick();
          }}
        ></button>
      </div>
    );
  });

  const Parent = () => {
    const test = 1
    const [renderCountState, setRenderCount] = useState(0);
    const countUp = () => {
      console.log('countUp');
      setRenderCount(renderCountState + 1);
    };
    // buttonClickの引数countUpだけでいいと思ったら何故かループ入る、、
    return (
      <div>
        <div>親コンポーネント</div>
        <div>{renderCountState}</div>
        <Child
          buttonClick={useCallback(() => {
            countUp();
          },[test])}
        />
        <Child2
          buttonClick={useCallback(() => {
            console.log('test');
          })}
        />
      </div>
    );
  };

  return (
    <div>
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
        <button onClick={() => double()}>カウントアップ</button>
        <button onClick={() => setCount99(count99 + 1)}>カウントアップ99</button>
      </div>
      <div>{double}</div>
      <div>{FizzBuzz}</div>
      <div>
        <UserContext.Provider value={user}>
          <ReactTest />
        </UserContext.Provider>
      </div>
      <button type="button" onClick={() => setUser({ ...user, job: 'firefighter' })}>
        Job Change for Firefighter
      </button>
      <div>{loadingElement}</div>
      <div>{weatherState}</div>
      <Parent />
      <Counter />
      <div className="observer" style={{ margin: '1000px 0' }}>
        この要素
      </div>
    </div>
  );
};

export default App;
