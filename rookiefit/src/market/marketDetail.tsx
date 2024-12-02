import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMarketItem, marketItems } from './marketData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './marketDetail.css';
import { ProductInfo } from './marketProductInfo';
import { WebSocketManager } from "../socket/webSocketManager";

// 상수 분리
const SLIDER_SETTINGS = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
};

const MarketDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const selectedItem = marketItems.find(item => item.id === Number(id));
    const [webSocketManager, setWebSocketManager] = useState<WebSocketManager | null>(null);

    if (!selectedItem) {
        return <div className="market-detail-error">상품을 찾을 수 없습니다.</div>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const wsManager = new WebSocketManager(
            (message) => console.log('Message received:', message),
            (chatRoomId) => {
                console.log('New chat room created:', chatRoomId);
                // 채팅방 ID를 받아서 필요한 처리 추가
                navigate(`/market/chat/${chatRoomId}`);
            }
        );
        wsManager.connect();
        setWebSocketManager(wsManager);

        return () => {
            wsManager.disconnect();
        };
    }, [navigate]);

    const handleDelete = () => {
        deleteMarketItem(selectedItem.id);
        alert("상품이 삭제되었습니다.");
        navigate('/market');
    };

    const handleChat = () => {
        if (webSocketManager) {
            const chatRoomData = {
                chatRoomName: selectedItem.title,  // 상품명으로 채팅방 이름 설정
                participantUserIds: ["mmglo"], // 해당 상품 사용자 ID
            };
            webSocketManager.CreateChatRoom(chatRoomData);
        }
        navigate(`/market/chat/${id}`, {
            state: {
                chatRoomId: id, // 전달
                userName: selectedItem.userName,
                title: selectedItem.title,
                price: selectedItem.price,
            }
        });
    };

    return (
        <div className="market-detail-wrapper">
            <div className="market-detail-header">
                <h1>상품 상세 정보</h1>
            </div>
            <div className="market-detail-content">
                <div className="market-detail-image">
                    <Slider {...SLIDER_SETTINGS}>
                        {selectedItem.images?.map((image: string, index: number) => (
                            <div key={index}>
                                <img src={image} alt={`${selectedItem.title} ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <ProductInfo
                    item={selectedItem}
                    onChat={handleChat}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default MarketDetail;
