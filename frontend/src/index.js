import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ThreadContextProvider } from './context/ThreadContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThreadContextProvider>
        
      <App />
      </ThreadContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

