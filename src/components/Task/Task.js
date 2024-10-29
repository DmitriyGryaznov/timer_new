import './Task.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ todoList, onChangeTaskItem, onDeleteTaskItem, handleTimerStart, handleTimerPause, timers }) => {
  const isEditing = todoList.className === 'editing';
  const [value, setValue] = useState(todoList.description);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onChangeTaskItem(todoList.id, false, value); // Сохраняем описание при нажатии Enter
      setValue('');
    }
  };

  const formattedTime = () => {
    if (timers[todoList.id]) {
      const { minutes, seconds } = timers[todoList.id];
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(todoList.minutes).padStart(2, '0')}:${String(todoList.seconds).padStart(2, '0')}`;
  };

  const shouldDisplayTimer = todoList.minutes > 0 || todoList.seconds > 0;

  return (
    <div>
      <div className="view">
        <input
          className="toggle"
          onChange={() => onChangeTaskItem(todoList.id)}
          checked={todoList.className === 'completed'}
          type="checkbox"
        />
        <label>
          <span className="title" onClick={() => onChangeTaskItem(todoList.id)}>
            {todoList.description}
          </span>
          {(todoList.className !== 'completed' && shouldDisplayTimer) && (
            <span className="description">
              <button className="icon icon-play" onClick={() => handleTimerStart(todoList.id)}></button>
              <button className="icon icon-pause" onClick={() => handleTimerPause(todoList.id)}></button>
              {formattedTime()}
            </span>
          )}
          <span className="description">создано {formatDistanceToNow(todoList.dateOfCreation)} назад</span>
        </label>
        <button className="icon icon-edit" onClick={() => onChangeTaskItem(todoList.id, true)}></button>
        <button className="icon icon-destroy" onClick={() => onDeleteTaskItem(todoList.id)}></button>
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={() => onChangeTaskItem(todoList.id, false, value)}
        />
      )}
    </div>
  );
};

Task.propTypes = {
  todoList: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    dateOfCreation: PropTypes.instanceOf(Date).isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
  }).isRequired,
  onChangeTaskItem: PropTypes.func.isRequired,
  onDeleteTaskItem: PropTypes.func.isRequired,
  handleTimerStart: PropTypes.func.isRequired,
  handleTimerPause: PropTypes.func.isRequired,
  timers: PropTypes.object.isRequired,
};

export default Task;
