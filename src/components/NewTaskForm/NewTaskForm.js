import React, { useState } from 'react';
import './NewTaskForm.css';

const NewTaskForm = ({ addTaskItem, endEditingTask }) => {
  const [text, setText] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let localInFunctionMinute = minute ? minute : '00';  
    let localInFunctionSecond = second ? second : '00'; 
    
    localInFunctionMinute = String(localInFunctionMinute).padStart(2, '0');
    localInFunctionSecond = String(localInFunctionSecond).padStart(2, '0');

    addTaskItem(text, localInFunctionMinute, localInFunctionSecond);

    setText('');
    setMinute('');
    setSecond('');
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        required
        size="2"
        onChange={(e) => {
          endEditingTask();
          setText(e.target.value)}}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min="0"
        max="9999"
        size="5"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
        placeholder="Min"
      />
      <input
        className="new-todo-form__timer"
        type="number"
        min="0"
        max="59"
        size="5"
        value={second}
        onChange={(e) => setSecond(e.target.value)}
        placeholder="Sec"
      />
      <input hidden type="submit" />
    </form>
  );
};

export default NewTaskForm;
