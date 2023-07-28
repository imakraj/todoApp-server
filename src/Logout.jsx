import React, { useContext } from 'react'
import { Context } from './index.js';
import axios from 'axios';
import {toast} from 'react-toastify';
import { Server } from './index.js';


const Logout = () => {
    const { setIsAuthenticated, setUser } = useContext(Context);
    const logout = async () => {
        try {
            const response = await axios.get(`${Server}/users/logout`,
                { withCredentials: true });

            setIsAuthenticated(false);
            setUser({});
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
        }
    }

    return (
        <div onClick={logout} className="cursor-pointer">Logout</div>
    )
}

export default Logout;