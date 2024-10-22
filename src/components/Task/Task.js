import './Task.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

const Task = ({ todoList, onChangeTaskItem, onDeleteTaskItem }) => {
  let drawingAccess = todoList.className === 'editing';

  const [value, setValue] = useState(todoList.description);
  const [minutes, setMinutes] = useState(todoList.minutes === 0 ? null : todoList.minutes);
  const [seconds, setSeconds] = useState(todoList.seconds === 0 ? null : todoList.seconds);
  const [idInterval, setIdInterval] = useState('');
  const [isAccessToStartTimer, setIsAccessToStartTimer] = useState(false);

  useEffect(() => {
    if (!isAccessToStartTimer) {
      return;
    }

    if (minutes === null && seconds <= 0) {
      clearInterval(idInterval);
      return;
    }

    if (seconds > 0) {
      setSeconds((prevSeconds) => prevSeconds - 1);
    } else if (minutes > 0) {
      setMinutes((prevMinutes) => prevMinutes - 1);
      setSeconds(59);
    } else {
      clearInterval(idInterval);
    }
  }, [isAccessToStartTimer, minutes, seconds, idInterval]);

  useEffect(() => {
    return () => {
      if (idInterval) {
        clearInterval(idInterval);
      }
    };
  }, [idInterval]);

  const handlerPlay = (e) => {
    if (e.target.className !== 'icon icon-play') {
      return;
    }

    if (!idInterval) {
      setIsAccessToStartTimer(true);
      setIdInterval(setInterval(() => {}, 1000));
    }
  };

  const handlerPause = () => {
    setIsAccessToStartTimer(false);
    clearInterval(idInterval);
    setIdInterval('');
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
      setIdInterval('');
    }

    drawingAccess = !drawingAccess;
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
  const createdAgo = `created ${formatDistanceToNow(todoList.dateOfCreation)} ago`;

  let localMinutes = minutes || 0;
  let localSeconds = seconds || 0;

  return (
    <div>
      <div className="view">
        <input
          className="toggle"
          onChange={onLabelClick}
          checked={todoList.className === 'completed' ? true : false}
          type="checkbox"
        />
        <label>
          <span className="title" onClick={onLabelClick}>
            {todoList.description}
          </span>
          <span className={minutes !== null || seconds !== null ? 'description' : 'hidden'}>
            <button className="icon icon-play" onClick={handlerPlay}></button>
            <button className="icon icon-pause" onClick={handlerPause}></button>
            {`${localMinutes}:${localSeconds < 10 ? `0${localSeconds}` : localSeconds}`}
          </span>
          <span className="description">{createdAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={changeRenderingData}></button>
        <button className="icon icon-destroy" onClick={onLabelClickDestroy}></button>
      </div>
      {drawingAccess && (
        <input type="text" className="edit" value={value} onChange={changeValue} onKeyPress={changeDescription} />
      )}
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
