import React, { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './index.css';

function BiliDanmu() {
    const [msgList, setMsgList] = useState([]);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const roomId = params.get('roomId');
    const { lastMessage } = useWebSocket("ws://" + window.location.host + "/bili-danmu/danmuList?roomId=" + roomId);

    useEffect(() => {
        if (lastMessage !== null) {
            setMsgList(preMsgList => preMsgList.concat(JSON.parse(lastMessage.data)));
            if (msgList.length > 30) {
                setMsgList(msgList.slice(msgList.length - 30, msgList.length));
            }
        };
    }, [lastMessage, setMsgList]);

    return (
        <div>
            <ul>
                {msgList.map((msg, index) => (
                    <li key="{index}" className='danmu-font'>
                        <img src={msg.avatar} className="avatar-img" /> {msg.name}: {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BiliDanmu;