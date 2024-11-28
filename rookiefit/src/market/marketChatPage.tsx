import React, { useEffect, useRef, useState } from 'react';
import './marketChatPage.css';
import { useLocation } from 'react-router-dom';
import { WebSocketManager } from '../socket/webSocketManager';

interface ChatMessage {
    id: number;
    content: string;
    timestamp: string;
    isMine: boolean;
    userName: string;
}

const MarketChatPage = () => {
    const location = useLocation();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { userName, title, price } = location.state;

    const token = "e";
    const webSocketManager = useRef<WebSocketManager | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleNewMessageReceived = (messageBody: string) => {
        const parsedMessage = JSON.parse(messageBody);
        const newChatMessage: ChatMessage = {
            id: messages.length + 1,
            content: parsedMessage.content,
            timestamp: new Date().toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            isMine: false,
            userName: parsedMessage.userName,
        };

        setMessages((prev) => [...prev, newChatMessage]);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newChatMessage: ChatMessage = {
            id: messages.length + 1,
            content: newMessage,
            timestamp: new Date().toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            isMine: true,
            userName: userName,
        };

        webSocketManager.current?.sendMessage("/app/sendmessage", {
            content: newMessage,
            userName: userName,
        });

        setMessages((prev) => [...prev, newChatMessage]);
        setNewMessage('');
    };

    useEffect(() => {
        webSocketManager.current = new WebSocketManager(token, handleNewMessageReceived);
        webSocketManager.current.connect();

        return () => {
            webSocketManager.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="market-chat-page-wrapper">
            <div className="market-chat-wrapper">
                <div className="market-chat-header-username">{userName}</div>
                <div className="market-chat-header-product">
                    <span className="market-chat-product-title">{title}</span>
                    <span className="market-chat-product-price">{price.toLocaleString()}원</span>
                </div>

                <div className="market-chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`market-chat-message ${message.isMine ? 'mine' : 'other'}`}>
                            <div className="market-chat-message-content">{message.content}</div>
                            <div className="market-chat-message-time">{message.timestamp}</div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* 스크롤 위치 지정용 요소 */}
                </div>

                <div className="market-chat-input-area">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메세지 보내기"
                        className="market-chat-input"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <button className="market-chat-send-button" onClick={handleSendMessage}>
                        전송하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketChatPage;
