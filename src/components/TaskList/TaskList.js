import React from 'react';

import Task from '../Task';
import './TaskList.css';

function TaskList({ todoList, onChangeTaskItem, onDeleteTaskItem }) {
  const elements = todoList.map((item) => (
    <li key={item.id} className={item.isHidden ? `${item.className} hidden` : item.className}>
      <Task todoList={item} onChangeTaskItem={onChangeTaskItem} onDeleteTaskItem={onDeleteTaskItem} />
    </li>
  ));

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  todoList: (props, propName, componentName) => {
    const valueProps = props[propName];

    if (typeof valueProps === 'object') {
      return null;
    }

    return new TypeError(`${componentName} must be object`);
  },
};

export default TaskList;
