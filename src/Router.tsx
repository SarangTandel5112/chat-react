import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './components/Chat';
import DragForm from './components/DragForm';
import Login from './components/Login';
import Register from './components/Register';
import Sample from './components/Sample';
import SampleChat from './components/SampleChat';
import SingleChat from './components/SingleChat';
import Success from './components/Success';
import DynamicForm from './FormComponent';
import FormComponent from './FormComponent';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DynamicForm />} />
                <Route path='/drag' element={<DragForm />} />
                <Route path='/sample' element={<Sample />} />
                <Route path='/register' element={<Register />} />
                <Route path='/success' element={<Success />} />
                <Route path='/chat' element={<Chat />} >
                    <Route path='' element={<SampleChat />} />
                    <Route path='/chat/:id' element={<SingleChat />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
