import { io } from 'socket.io-client';

const token = localStorage.getItem('auth-token')

const URL = `http://localhost:4100?authorization=${token}`;

export const socket = io(URL, {
    autoConnect: false
});