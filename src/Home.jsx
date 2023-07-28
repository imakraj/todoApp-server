import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CreateTask from './CreateTask';
import { Context } from './index';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';
import { toast } from 'react-toastify';
import { Server } from './index';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

  const addNewTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`${Server}/users/user`, {
        withCredentials: true
      });

      getTasks();
      setIsAuthenticated(true);
      setUser(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(`${Server}/tasks`, {
        withCredentials: true
      });

      setTasks(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${Server}/tasks/${id}`, {
        withCredentials: true,
      });
      const updatedTasks = tasks.filter(task => task._id !== response.data._id);
      setTasks(updatedTasks);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const updateTask = async (id) => {
    try {
      const response = await axios.patch(`${Server}/tasks/${id}`, {
        isComplete: !tasks.find(task => task._id === id).isComplete
      }, {
        withCredentials: true
      });

      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, isComplete: !task.isComplete } : task
      );

      setTasks(updatedTasks);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (loading) {
    return <Loading />
  }

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="flex items-center justify-center w-screen min-h-screen pt-14 pb-12 font-medium">
      <div className="flex flex-grow items-center justify-center bg-gray-900 h-full">
        <div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg max-w-xs text-gray-200">
          <div className="flex items-center mb-6">
            <svg className="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            {isAuthenticated && user ? <h4 className="font-semibold ml-3 text-lg"> {capitalizeFirstLetter(user.name)} Do It now!</h4> : " "}
          </div>
          {tasks.map((task) => (
            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-900" key={task._id}>
              <div onClick={() => { updateTask(task._id) }}>
                <input className="hidden" type="checkbox" id={task._id} />
                <label className="flex items-center h-10 px-2 rounded cursor-pointer" htmlFor={task._id}>
                  <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="ml-4 text-sm">{task.task}</span>
                </label>
              </div>
              {task.isComplete ?
                <span className="text-rose-600 mr-2" onClick={() => { deleteTask(task._id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </span>
                : ""}
            </div>
          ))}

          <CreateTask onTaskCreated={addNewTask} />
        </div>
      </div>
    </div>
  )
}

export default Home;
