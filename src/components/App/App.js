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
      minutes: 0,
      seconds: 0,
      dateOfCreation: new Date('June 25, 2024 23:15:30'),
    },
    {
      className: 'editing',
      description: 'Editing task',
      id: 2,
      minutes: 0,
      seconds: 0,
      dateOfCreation: new Date('June 26, 2024 16:14:11'),
    },
    {
      className: '',
      description: 'Active task',
      id: 3,
      minutes: '3',
      seconds: '34',
      dateOfCreation: new Date('June 27, 2024 13:00:00'),
    },
  ]);

  const [id, setId] = useState(100);
  const [filter, setFilter] = useState('all');

  const changeTaskItem = (id, isEditing = false, description = '') => {
    setTasks((tasks) => {
      const idx = tasks.findIndex((el) => el.id === id);
      let newItem;

      if (!isEditing) {
        if (tasks[idx].className === 'completed') {
          newItem = { ...tasks[idx], className: '' };
        } else if (!tasks[idx].className) {
          newItem = { ...tasks[idx], className: 'completed' };
        } else if (tasks[idx].className === 'editing') {
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
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };

  const createTaskItem = (text, minutes, seconds) => {
    const newTask = {
      className: '',
      description: text,
      id: id,
      minutes: minutes,
      seconds: seconds,
      dateOfCreation: new Date(),
    };
    setId((id) => id + 1);
    return newTask;
  };

  const addTaskItem = (text, minutes, seconds) => {
    const newTask = createTaskItem(text, minutes, seconds);
    setTasks((tasks) => [...tasks, newTask]);
  };

  const changeTaskList = (typeOfFilter) => {
    setFilter(typeOfFilter);
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter((task) => (filter === 'completed' ? task.className === 'completed' : task.className === ''));

  const deleteCompletedTasks = () => {
    setTasks((tasks) => tasks.filter((task) => task.className !== 'completed'));
  };

  const getCountOfUnfinishedTasks = () => {
    return tasks.filter((task) => task.className !== 'completed').length;
  };

  return (
    <section className="todoapp">
      <header className="header">
        <Header />
        <NewTaskForm addTaskItem={addTaskItem} />
      </header>

      <section className="main">
        <TaskList todoList={filteredTasks} onChangeTaskItem={changeTaskItem} onDeleteTaskItem={deleteTaskItem} />

        <footer className="footer">
          <CounterOfUnfinishedTasks countOfUnfinishedTasks={getCountOfUnfinishedTasks} />
          <TasksFilter filterList={changeTaskList} />
          <CleareCompleted cleareCompletedTasks={deleteCompletedTasks} />
        </footer>
      </section>
    </section>
  );
}
