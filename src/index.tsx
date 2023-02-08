import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from './components/NavBar/NavBar';
import AuthProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ChakraProvider>
          <NavBar />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
