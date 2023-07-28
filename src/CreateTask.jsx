import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from './index';
import { Navigate } from 'react-router-dom';

const CreateTask = ({ onTaskCreated }) => {
  const [task, setTask] = useState('');
  const { isAuthenticated } = useContext(Context);


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3001/api/tasks/new", {
  //       task
  //     }, {
  //       withCredentials: true
  //     });

  //     setTask('');

  //     console.log(response.data);
  //     onTaskCreated(response.data);
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // };

  const createTask = async (event) => {
    try {
      const response = await axios.post("http://localhost:3001/api/tasks/new", {
        task
      }, {
        withCredentials: true
      });

      setTask('');
      onTaskCreated(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <label className="text-white m-4 mr-0" htmlFor="newTask">New Task</label>
    //   <input className="ml-2 rounded text-black border" id="newTask" type="text" name="task" value={task} onChange={(e) => setTask(e.target.value)} />
    //   <button className="text-white ml-2 bg-slate-500 px-3 rounded" type="submit">Submit</button>
    // </form>

    <div className="flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded cursor-pointer">
      <svg className="w-5 h-5 text-gray-400 fill-current" onClick={createTask} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <input className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium" type="text" name="task" value={task} placeholder="Add a new task" onChange={(e) => setTask(e.target.value)}/>
    </div>
  )
}

export default CreateTask;