import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { Context } from './index';

const Navbar = () => {
    const { isAuthenticated, user } = useContext(Context);

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className='w-screen h-12 bg-gray-800 text-white flex justify-between items-center px-5'>
            <div>
                <Link className="font-bold" to="/">ToDo</Link>
            </div>
            {isAuthenticated && user ? "Hello " + capitalizeFirstLetter(user.name) : " "}

            {isAuthenticated ? <Logout /> : <div className='flex gap-2'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>}
        </div>
    )
}

export default Navbar