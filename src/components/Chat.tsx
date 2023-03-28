import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import axios from 'axios';
import SingleChat from './SingleChat';
import SampleChat from './SampleChat';
import { Link, Outlet } from 'react-router-dom';

function Chat() {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [user, setUser] = useState([])
    const [chat, setChat] = useState([])
    const [receiver, setReceiver] = useState()
    const [userName, setUserName]: any = useState()

    // const onMsgReceive = async (data:any) => {
    //     console.log(data, '=========data.senderId ============');
    //     setChat(oldChat => [...oldChat, data])
    // }


    useEffect(() => {

        const token = localStorage.getItem('auth-token')
        axios.get('http://127.0.0.1:3100/api/user/get-user', {
            headers: {
                Authorization: token
            }
        }).then(function (response) {
            console.log(response.data.result.currentUser);
            setUser(response.data.result.listUser)
            setUserName(response.data.result.currentUser)
        }).catch(function (error) {
            console.log(error);
        });

    }, []);

    return (
        <div className="container">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <div id="plist" className="people-list">
                            {
                                userName && <li className="clearfix" >
                                    <img src={userName.profilePic} alt="avatar" className="userimg" />
                                    <div className="about">
                                        <div className="name">{userName.email}</div>
                                        <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
                                    </div>
                                </li>
                            }
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Search..." />
                            </div>
                            <ul className="list-unstyled chat-list mt-2 mb-0">
                                {
                                    user && user.length &&
                                    user.map((singleUser: any) => (
                                        <Link to={`/chat/${singleUser.id}`}>
                                            <div >
                                                <li className="clearfix" >
                                                    <img src={singleUser.profilePic} alt="avatar" />
                                                    <div className="about">
                                                        <div className="name">{singleUser.email}</div>
                                                        <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div>
                                                    </div>
                                                </li>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Chat;
