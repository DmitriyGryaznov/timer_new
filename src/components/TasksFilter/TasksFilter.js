import React, { useState } from 'react';
import './TasksFilter.css';

const TasksFilter = ({ filterList }) => {
  const [selectedButton, setSelectedButton] = useState('all');

  const filterTaskList = (e) => {
    const filter = e.target.innerText.toLowerCase();
    filterList(filter);
    setSelectedButton(filter);
  };

  return (
    <ul className="filters">
      <li>
        <button type="button" className={selectedButton === 'all' ? 'selected' : ''} onClick={filterTaskList}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={selectedButton === 'active' ? 'selected' : ''} onClick={filterTaskList}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className={selectedButton === 'completed' ? 'selected' : ''} onClick={filterTaskList}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;
