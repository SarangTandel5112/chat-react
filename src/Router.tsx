import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import SampleChat from './components/SampleChat';
import SingleChat from './components/SingleChat';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/chat' element={<Chat />} >
                    <Route path='' element={<SampleChat />} />
                    <Route path='/chat/:id' element={<SingleChat />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
