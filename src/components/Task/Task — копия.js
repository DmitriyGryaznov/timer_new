import './Task.css';
import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ todoList, onChangeTaskItem, onDeleteTaskItem }) => {
  const { id, title, isCompleted } = todoList;

  const handleToggleComplete = () => {
    // Изменяем статус задачи при её завершении
    onChangeTaskItem(id, { ...todoList, isCompleted: !isCompleted });
  };

  return (
    <div className={isCompleted ? 'completed' : ''}>
      <span>{title}</span>
      <button onClick={handleToggleComplete}>
        {isCompleted ? 'Reopen' : 'Complete'}
      </button>
      <button onClick={() => onDeleteTaskItem(id)}>Delete</button>
    </div>
  );
};

Task.propTypes = {
  todoList: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onChangeTaskItem: PropTypes.func.isRequired,
  onDeleteTaskItem: PropTypes.func.isRequired,
};

export default Task;
