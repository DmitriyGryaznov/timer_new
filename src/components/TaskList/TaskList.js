import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './TaskList.css';

function TaskList({ todoList, onChangeTaskItem, onDeleteTaskItem, handleTimerStart, handleTimerPause, timers }) {
  const elements = todoList.map((item) => (
    <li key={item.id} className={item.className}>
      <Task
        todoList={item}
        onChangeTaskItem={onChangeTaskItem}
        onDeleteTaskItem={onDeleteTaskItem}
        handleTimerStart={handleTimerStart}
        handleTimerPause={handleTimerPause}
        timers={timers}
      />
    </li>
  ));

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onChangeTaskItem: PropTypes.func.isRequired,
  onDeleteTaskItem: PropTypes.func.isRequired,
  handleTimerStart: PropTypes.func.isRequired,
  handleTimerPause: PropTypes.func.isRequired,
  timers: PropTypes.object.isRequired,
};

export default TaskList;
