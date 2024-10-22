import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './TaskList.css';

function TaskList({ todoList, onChangeTaskItem, onDeleteTaskItem, activeFilter }) {
  const filteredTasks = () => {
    switch (activeFilter) {
      case 'completed':
        return todoList.filter(item => item.className === 'completed');
      case 'active':
        return todoList.filter(item => item.className === '');
      default:
        return todoList;
    }
  };

  const elements = filteredTasks().map((item) => (
    <li key={item.id} className={item.isHidden ? `${item.className} hidden` : item.className}>
      <Task
        todoList={item}
        onChangeTaskItem={onChangeTaskItem}
        onDeleteTaskItem={onDeleteTaskItem}
      />
    </li>
  ));

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  todoList: PropTypes.array.isRequired,
  onChangeTaskItem: PropTypes.func.isRequired,
  onDeleteTaskItem: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

export default TaskList;
