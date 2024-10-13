import React from 'react';

import './CounterOfUnfinishedTasks.css';

function CounterOfUnfinishedTasks(props) {
  return <span className="todo-count">{`${props.countOfUnfinishedTasks()} items left`}</span>;
}

export default CounterOfUnfinishedTasks;
