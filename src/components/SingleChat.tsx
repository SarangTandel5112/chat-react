import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TagComp from './TagComp';
import { useSelector, useDispatch } from 'react-redux'
import { userAction } from '../redux/actions/userAction';
import UserName from './UserName';

function SingleChat() {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [msgInput, setMsgInput] = useState("")
    const [chat, setChat]: any = useState()
    const [receiver, setReceiver]: any = useState()
    const [sender, setSender]: any = useState()
    const dispatch = useDispatch()

    const handleChangeValue = (event: any) => {
        setMsgInput(event.target.value)
    }

    const { id } = useParams()

    const handleSelect = async (id: any) => {
        const token = localStorage.getItem('auth-token')
        axios.get(`http://127.0.0.1:3100/api/user/get-user/${id}`, {
            headers: {
                Authorization: token
            }
        }).then(function (response) {
            console.log(response.data.result.receiverUser, '-------response.data.result.chatDetails-------');
            dispatch(userAction(response.data.result.receiverUser))

            setChat(response.data.result.chatDetails)
            setReceiver(response.data.result.receiverUser)
            setSender(response.data.result.senderUser)
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleSend = () => {
        console.log("---------------");
        console.log(receiver, '------receiver------');
        console.log(sender, '-------receiver------');

        setMsgInput("")

        socket.emit('send-message', {
            "senderId": sender?.id,
            "receiverId": receiver?.id,
            "message": msgInput
        })

        setChat((prev: any) => [...prev, {
            "senderId": sender?.id,
            "receiverId": receiver?.id,
            "message": msgInput
        }])
    }

    const receiveMsg = (data: any) => {
        console.log(data, '--data------');
        console.log(sender, '------sender-----');
        console.log(receiver, '-----receiver-----');
        setChat((oldChat: any) => [...oldChat, data])
    }

    useEffect(() => {

        function onConnect(data: any) {
            console.log(data, "socket connected-----------------");
            setIsConnected(true);
        }


        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on('disconnect', onDisconnect);

        handleSelect(id)

        socket.connect();
        socket.on('connect', () => onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('receive-msg', receiveMsg)

        return () => {
            socket.off('connect', () => onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('receive-msg', receiveMsg)
            // socket.off('receive-msg', onMsgReceive)
        };
    }, [id]);

    return (
        <div className="container">
            <div className="chat">
                <div className="chat-header clearfix">
                    <div className="row">
                        {
                            receiver &&
                            < div className="col-lg-6">
                                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                    <img src={receiver.profilePic} alt="avatar" />
                                </a>
                                <div className="chat-about">
                                    <h6 className="m-b-0">{receiver.email}</h6>
                                    <small>Last seen: 2 hours ago</small>
                                </div>
                            </div>
                        }

                        <div className="col-lg-6 hidden-sm text-right">
                            <a href="javascript:void(0);" className="btn btn-outline-secondary"><i
                                className="fa fa-camera"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-primary"><i
                                className="fa fa-image"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-info"><i
                                className="fa fa-cogs"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-warning"><i
                                className="fa fa-question"></i></a>
                        </div>
                    </div>
                </div>
                <div className="chat-history">
                    <ul className="m-b-0">
                        {
                            chat && chat.length && chat.map((message: any) => (
                                message.senderId == sender.id ?
                                    <li className="clearfix">
                                        <div className="message-data text-right">
                                            <span className="message-data-time">10:10 AM, Today</span>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                        </div>
                                        <div className="message other-message float-right">{message.message}</div>
                                    </li> :
                                    <li className="clearfix">
                                        <div className="message-data">
                                            <span className="message-data-time">10:12 AM, Today</span>
                                        </div>
                                        <div className="message my-message">{message.message}</div>
                                    </li>
                            ))
                        }


                    </ul>
                </div>
                <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                        <div className="input-group-prepend" onClick={handleSend}>
                            <span className="input-group-text"><i className="fa fa-send"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter text here..." value={msgInput} onChange={handleChangeValue} />
                    </div>
                </div>
            </div>
        </div >

    )

}

export default SingleChat;
