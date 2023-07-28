import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from './index';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Server } from './index';

const CreateTask = ({ onTaskCreated }) => {
  const [task, setTask] = useState('');
  const { isAuthenticated } = useContext(Context);

  const createTask = async (event) => {
    try {
      const response = await axios.post(`${Server}/tasks/new`, {
        task
      }, {
        withCredentials: true
      });

      setTask('');
      onTaskCreated(response.data);
      toast.success("New task created");
    } catch (error) {
      console.error('Error fetching tasks:', error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <div className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded cursor-pointer">
      <svg className="w-5 h-5 text-gray-400 fill-current" onClick={createTask} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <input className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium" type="text" name="task" value={task} placeholder="Add a new task" onChange={(e) => setTask(e.target.value)} />
    </div>
  )
}

export default CreateTask;