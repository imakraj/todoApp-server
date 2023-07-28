import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from './index';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Server } from './index';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${Server}/users/login`, {
                email,
                password
            }, { withCredentials: true });

            if(response.status === 401) {
                console.log(response.status);
            }

            setIsAuthenticated(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
        }
    }

    if (isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return ( 
        <div className="bg-gray-900  h-screen w-screen flex  flex-col justify-center items-center">
            <h1 className="text-white font-bold text-[1.5rem] mb-4">Login</h1>
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Email</label>
                        <input className="rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 font-medium" id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Password</label>
                        <input className="rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 font-medium" id="password" type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-rose-600 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;