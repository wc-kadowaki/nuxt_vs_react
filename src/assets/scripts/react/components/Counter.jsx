import React, { useReducer } from 'react';

const initialState = 0;

const reducerFunction = (countState, action) => {
  switch (action) {
    case 'increment':
      return ++countState;
    case 'decrement':
      return --countState;
    case 'reset':
      return (countState = initialState);
    case 'twice':
      return (countState = countState * 2);
    default:
      return countState;
  }
};

const Counter = () => {
  const [count, dispatch] = useReducer(reducerFunction, initialState);
  return (
    <div>
      <div>カウント：{count}</div>
      <button onClick={() => dispatch('increment')}>Increment</button>
      <button onClick={() => dispatch('decrement')}>Decrement</button>
      <button onClick={() => dispatch('reset')}>Reset</button>
      <button onClick={() => dispatch('twice')}>Twice</button>
    </div>
  );
};

export default Counter;
