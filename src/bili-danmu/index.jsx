import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import './index.css';

function BiliDanmu() {
    const [msgList, setMsgList] = useState([]);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const roomId = params.get('roomId');
    const { lastMessage } = useWebSocket("ws://" + window.location.host + "/bili-danmu/danmuList?roomId=" + roomId);

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest" })
    }

    useEffect(() => {
        if (lastMessage !== null) {
            setMsgList(JSON.parse(lastMessage.data));
        };
        scrollToBottom()
    }, [lastMessage, setMsgList]);

    return (
        <div>
            {
                msgList.map((msg, index) => (
                    msg.sc ?
                        <div key="{index}" className='danmu-font'>
                            <img src={msg.avatar} className="avatar-img" /> [SC] {msg.name} {msg.content}
                        </div>
                        :
                        <div key="{index}" className='danmu-font'>
                            <img src={msg.avatar} className="avatar-img" /> {msg.name} {msg.content}
                        </div>
                ))
            }
            <div ref={messagesEndRef} />
        </div>
    );
}

export default BiliDanmu;