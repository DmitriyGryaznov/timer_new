import React, { useState } from 'react';

import './TasksFilter.css';

const TasksFilter = ({ filterList }) => {
  const [selectedButton, setSelectedButton] = useState('all');

  function filterTaskList(e) {
    filterList(e.target.innerText);
    changeSelectedButton(e.target.innerText);
  }

  function changeSelectedButton(textButton) {
    setSelectedButton(textButton.toLowerCase());
  }

  return (
    <ul className="filters">
      <li>
        <button type="button" className={selectedButton === 'all' ? 'selected' : null} onClick={filterTaskList}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={selectedButton === 'active' ? 'selected' : null} onClick={filterTaskList}>
          Active
        </button>
      </li>
      <li>
        <button type="button" className={selectedButton === 'completed' ? 'selected' : null} onClick={filterTaskList}>
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;
