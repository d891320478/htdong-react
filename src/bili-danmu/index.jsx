import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import './index.css';

function BiliDanmu() {
    const [msgList, setMsgList] = useState([]);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const roomId = params.get('roomId');
    const { lastMessage } = useWebSocket("ws://" + window.location.host + "/bili-danmu/danmuList/testGift?roomId=" + roomId);

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

    useEffect(() => {
        function check() {
            let dom = document.getElementById('page')
            if (dom) {
                scrollToBottom()
            } else {
                setTimeout(check, 0)
            }
        }
        check()
    })

    return (
        <div ref={messagesEndRef} id="page">
            {
                msgList.map((msg, index) => (
                    msg.empty ? // 初始化出来的空消息
                        <div key="{index}" className='danmu-font' ref={messagesEndRef}>
                            <div>{msg.content == "" ? '\u00A0' : msg.content}</div>
                        </div>
                        :
                        msg.gift ? // 礼物
                            (
                                msg.giftType == "gold" ?
                                    // 金瓜子礼物
                                    <div key="{index}" className='gift-font' ref={messagesEndRef}>
                                        <img src={msg.avatar} className="avatar-img-gift" /> {msg.name} 投喂{msg.content} x{msg.giftNum}
                                    </div>
                                    :
                                    // 银瓜子礼物
                                    <div key="{index}" className='danmu-font' ref={messagesEndRef}>
                                        <img src={msg.avatar} className="avatar-img" /> {msg.name} 投喂{msg.content} x{msg.giftNum}
                                    </div>
                            )
                            :
                            msg.guard ?
                                <div key="{index}" className='gift-font' ref={messagesEndRef}>
                                    <img src={msg.avatar} className="avatar-img-gift" /> 感谢{msg.name}开通了{msg.giftNum}个月{msg.content}
                                </div>
                                :
                                msg.sc ? // SC
                                    <div key="{index}" className='sc-danmu-font' ref={messagesEndRef}>
                                        <div style={{ backgroundColor: "#00ffff" }}>
                                            <img src={msg.avatar} className="avatar-img" />{msg.name}
                                        </div>
                                        <div style={{ backgroundColor: "#99ffff" }}>{msg.content}</div>
                                    </div>
                                    :
                                    msg.type == 1 ? // emoji弹幕
                                        <div key="{index}" className='danmu-font' ref={messagesEndRef}>
                                            <img src={msg.avatar} className="avatar-img" /> {msg.name} <img src={msg.emoticonUrl} className="emoticon-img" />
                                        </div>
                                        : // 普通弹幕
                                        <div key="{index}" className='danmu-font' ref={messagesEndRef}>
                                            <img src={msg.avatar} className="avatar-img" /> {msg.name} {msg.content}
                                        </div>
                ))
            }
        </div >
    );
}

export default BiliDanmu;