import React, { useEffect, useRef, useState } from 'react'
import './makeChatPage.css'

interface ChatMessage {
    id: number;
    content: string;
    timestamp: string;
    isMine: boolean;
    userName: string;
}

const MarketChatPage = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            userName: '현재 사용자'
        };

        setMessages(prev => [...prev, newChatMessage]);
        setNewMessage(''); // 입력창 초기화
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="market-chat-page-wrapper">
            <div className="chat-wrapper">
                <div className="chat-header">
                    동동한 토끼
                </div>

                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`chat-message ${message.isMine ? 'mine' : 'other'}`}>
                            <div className="message-content">
                                {message.content}
                            </div>
                            <div className="message-time">
                                {message.timestamp}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* 스크롤 위치 지정용 요소 */}
                </div>

                <div className="chat-input-area">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메세지 보내기"
                        className="chat-input"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        className="chat-send-button"
                        onClick={handleSendMessage}
                    >
                        전송하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketChatPage
