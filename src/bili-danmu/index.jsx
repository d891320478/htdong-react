import React, { useEffect, useState } from 'react';
import WebSocket from 'websocket';

function BiliDanmu() {
    const [msgList, setMsgList] = useState([]);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const roomId = params.get('roomId');

    useEffect(() => {
        const ws = new WebSocket('ws://' + window.location.host + "/bili-danmu/danmuList?roomId=" + roomId);

        ws.onmessage = function (event) {
            const data = event.data;
            setMsgList(preMsgList => [...preMsgList, data]);
            if (msgList.length > 30) {
                setMsgList(msgList.slice(msgList.length - 30, msgList.length));
            }
        };
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <ul>
                {msgList.map((msg, index) => (
                    <li key="{index}">
                        <img src={msg.avatar} /> {msg.name}: {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BiliDanmu;