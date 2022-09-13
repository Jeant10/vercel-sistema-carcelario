import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AppRouter } from './routes/AppRouter';
import {NativeBaseProvider} from 'native-base';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NativeBaseProvider>
    <AppRouter/>
    </NativeBaseProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);


