import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

export const Context = createContext({ isAuthenticated: false });

export const Server = "https://todoapp-r5zw.onrender.com/api"
// export const Server = "http://localhost:3001/api"

const AuthContext = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    return (
        <Context.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser
        }}>
            <App />
        </Context.Provider>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContext />
);