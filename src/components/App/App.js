import React, { useState } from 'react';

import './App.css';

import Header from '../Header';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import TasksFilter from '../TasksFilter';
import CleareCompleted from '../CleareCompleted';
import CounterOfUnfinishedTasks from '../CounterOfUnfinishedTasks';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      className: 'completed',
      description: 'Completed task',
      id: 1,
      isHidden: false,
      minutes: 0,
      seconds: 0,
      dateOfCreation: new Date('June 25, 2024 23:15:30'),
    },
    {
      className: 'editing',
      description: 'Editing task',
      id: 2,
      isHidden: false,
      minutes: 0,
      seconds: 0,
      dateOfCreation: new Date('June 26, 2024 16:14:11'),
    },
    {
      className: '',
      description: 'Active task',
      id: 3,
      isHidden: false,
      minutes: '3',
      seconds: '34',
      dateOfCreation: new Date('June 27, 2024 13:00:00'),
    },
  ]);

  const [id, setId] = useState(100);

  const changeTaskItem = (id, isEditing = false, description = '') => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.id === id);
      let newItem;

      if (!isEditing) {
        if (tasks[idx].className === 'completed') {
          newItem = { ...tasks[idx], className: '' };
        }

        if (!tasks[idx].className) {
          newItem = { ...tasks[idx], className: 'completed' };
        }

        if (tasks[idx].className === 'editing') {
          newItem = { ...tasks[idx], className: '' };
        }
      } else if (!description) {
        newItem = { ...tasks[idx], className: 'editing' };
      } else {
        newItem = { ...tasks[idx], description };
      }

      const newArray = [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)];

      return newArray;
    });
  };

  const deleteTaskItem = (id) => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.id === id);

      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];

      return newArray;
    });
  };

  const createTaskItem = (text, minutes, seconds) => {
    setId((id) => id + 1);

    const newTask = {
      className: '',
      description: text,
      id: id,
      minutes: minutes,
      seconds: seconds,
      isHidden: false,
      dateOfCreation: new Date(),
    };

    return newTask;
  };

  const addTaskItem = (text, minutes, seconds) => {
    const newObject = [...tasks, createTaskItem(text, minutes, seconds)];

    setTasks(newObject);
  };

  const changeTaskList = (typeOfFilter) => {
    setTasks((tasks) => createFilteredArray(typeOfFilter, tasks));
  };

  const createFilteredArray = (typeOfFilter, tasks) => {
    const newFilteredArray = [];

    tasks.map((task) => {
      if (typeOfFilter.toLowerCase() === 'completed') {
        if (task.className === typeOfFilter.toLowerCase()) {
          newFilteredArray.push({ ...task, isHidden: false });
        } else {
          newFilteredArray.push({ ...task, isHidden: true });
        }
      }

      if (typeOfFilter.toLowerCase() === 'active') {
        if (task.className === '') {
          newFilteredArray.push({ ...task, isHidden: false });
        } else {
          newFilteredArray.push({ ...task, isHidden: true });
        }
      }

      if (typeOfFilter.toLowerCase() === 'all') {
        newFilteredArray.push({ ...task, isHidden: false });
      }
    });

    return newFilteredArray;
  };

  const deleteCompletedTasks = () => {
    tasks.map((task) => {
      if (task.className === 'completed') {
        deleteTaskItem(task.id);
      }
    });
  };

  const getCountOfUnfinishedTasks = () => {
    let count = 0;

    tasks.map((task) => {
      if (task.className !== 'completed') {
        count++;
      }
    });

    return count;
  };

  return (
    <section className="todoapp">
      <header className="header">
        <Header />
        <NewTaskForm addTaskItem={addTaskItem} />
      </header>

      <section className="main">
        <TaskList todoList={tasks} onChangeTaskItem={changeTaskItem} onDeleteTaskItem={deleteTaskItem} />

        <footer className="footer">
          <CounterOfUnfinishedTasks countOfUnfinishedTasks={getCountOfUnfinishedTasks} />
          <TasksFilter filterList={changeTaskList} />
          <CleareCompleted cleareCompletedTasks={deleteCompletedTasks} />
        </footer>
      </section>
    </section>
  );
}
