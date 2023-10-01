import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Header from './components/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
      </Routes>

     
      <ToastContainer theme="dark" closeOnClick/>

    </BrowserRouter>
  );
}

export default App;
