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
      minutes: 3,
      seconds: 34,
      dateOfCreation: new Date('June 27, 2024 13:00:00'),
    },
  ]);

  const [id, setId] = useState(100);
  const [filter, setFilter] = useState('all');
  
  const [timers, setTimers] = useState({});
  const [intervals, setIntervals] = useState({});

  const endEditingTask = () => {
    setTasks((tasks) =>
      tasks.map(task =>
        task.className === 'editing' ?
          { ...task, className: '' } :
          task
      )
    );
  };

  const changeTaskItem = (id, isEditing = false, description = '') => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === id) {
        if (isEditing) {
          return {
            ...task,
            className: 'editing',
            description: description
          };
        } else if (task.className === 'editing') {
          return {
            ...task,
            className: '',
            description: description
          };
        } else {
          return {
            ...task,
            className: task.className === 'completed' ? '' : 'completed',
          };
        }
      }
      return task;
    }));
  };

  const deleteTaskItem = (id) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
    clearInterval(intervals[id]);
    const newTimers = { ...timers };
    delete newTimers[id];
    setTimers(newTimers);
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
    : tasks.filter((task) => {
      if (filter === 'completed') {
        return task.className === 'completed';
      } else if (filter === 'active') {
        return task.className === '' || task.className === 'editing';
      }
      return false;
    });

  const deleteCompletedTasks = () => {
    setTasks(tasks => tasks.filter(task => task.className !== 'completed'));
  };

  const getCountOfUnfinishedTasks = () => {
    return tasks.filter(task => task.className !== 'completed').length;
  };

  const handleTimerStart = (id) => {
    const task = timers[id] ? timers[id] : tasks.find(task => task.id === id);
    const intervalId = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        if (newTimers[id]) {
          if (newTimers[id].seconds > 0) {
            newTimers[id].seconds--;
          } else if (newTimers[id].minutes > 0) {
            newTimers[id].minutes--;
            newTimers[id].seconds = 59;
          }
        }
        return newTimers;
      });
    }, 1000);

    setIntervals(prevIntervals => ({
      ...prevIntervals,
      [id]: intervalId,
    }));

    setTimers(prevTimers => ({
      ...prevTimers,
      [id]: { minutes: task.minutes, seconds: task.seconds },
    }));
  };

  const handleTimerPause = (id) => {
    clearInterval(intervals[id]);
    const newIntervals = { ...intervals };
    delete newIntervals[id];
    setIntervals(newIntervals);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <Header />
        <NewTaskForm addTaskItem={addTaskItem} endEditingTask={endEditingTask} />
      </header>

      <section className="main">
        <TaskList 
          todoList={filteredTasks} 
          onChangeTaskItem={changeTaskItem} 
          onDeleteTaskItem={deleteTaskItem} 
          handleTimerStart={handleTimerStart} 
          handleTimerPause={handleTimerPause} 
          timers={timers} 
        />
        
        <footer className="footer">
          <CounterOfUnfinishedTasks countOfUnfinishedTasks={getCountOfUnfinishedTasks} />
          <TasksFilter filterList={changeTaskList} />
          <CleareCompleted cleareCompletedTasks={deleteCompletedTasks} />
        </footer>
      </section>
    </section>
  );
}
