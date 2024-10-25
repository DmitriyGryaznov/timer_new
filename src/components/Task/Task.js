import './Task.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ todoList, onChangeTaskItem, onDeleteTaskItem }) => {
  const isEditing = todoList.className === 'editing';

  const [value, setValue] = useState(todoList.description);
  const [minutes, setMinutes] = useState(todoList.minutes);
  const [seconds, setSeconds] = useState(todoList.seconds);
  const [idInterval, setIdInterval] = useState(null);
  const [isAccessToStartTimer, setIsAccessToStartTimer] = useState(false);

  useEffect(() => {
    if (!isAccessToStartTimer || (minutes === 0 && seconds === 0)) {
      clearInterval(idInterval);
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59; 
        }
        return 0; 
      });
    }, 1000);

    setIdInterval(intervalId);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAccessToStartTimer, minutes, seconds]);

  const handlerPlay = () => {
    if (!isAccessToStartTimer && !(minutes === 0 && seconds === 0)) {
      setIsAccessToStartTimer(true);
    }
  };

  const handlerPause = () => {
    setIsAccessToStartTimer(false);
    clearInterval(idInterval);
  };

  const onLabelClick = () => {
    onChangeTaskItem(todoList.id);
  };

  const onLabelClickDestroy = () => {
    onDeleteTaskItem(todoList.id);
    clearInterval(idInterval);
  };

  const changeRenderingData = (isEditing = true) => {
    if (idInterval) {
      clearInterval(idInterval);
    }
    onChangeTaskItem(todoList.id, isEditing);
  };

  const changeDescription = (e) => {
    if (e.key === 'Enter') {
      onChangeTaskItem(todoList.id, true, value);
      setValue('');
      changeRenderingData(false);
    }
  };

  const changeValue = (e) => setValue(e.target.value);
  const createdAgo = `создано ${formatDistanceToNow(todoList.dateOfCreation)} назад`;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div>
      <div className="view">
        <input
          className="toggle"
          onChange={onLabelClick}
          checked={todoList.className === 'completed'}
          type="checkbox"
        />
        <label>
          <span className="title" onClick={onLabelClick}>
            {todoList.description}
          </span>
          <span className={minutes !== 0 || seconds !== 0 ? 'description' : 'hidden'}>
            <button className="icon icon-play" onClick={handlerPlay}></button>
            <button className="icon icon-pause" onClick={handlerPause}></button>
            {formattedTime}
          </span>
          <span className="description">{createdAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={() => changeRenderingData(true)}></button>
        <button className="icon icon-destroy" onClick={onLabelClickDestroy}></button>
      </div>
      {isEditing && (
        <input type="text" className="edit" value={value} onChange={changeValue} onKeyPress={changeDescription} />
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
};

export default Task;
