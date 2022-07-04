import React, { useContext } from 'react';
import { UserContext } from '../App';

const ReactTest = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <div>名前：{user.name}</div>
      <div>年齢：{user.age}</div>
      <div>職業：{user.job}</div>
    </div>
  );
};

export default ReactTest;
