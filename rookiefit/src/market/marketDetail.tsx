import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMarketItem, marketItems } from './marketData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './marketDetail.css';
import { ProductInfo } from './marketProductInfo';

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

    if (!selectedItem) {
        return <div className="market-detail-error">상품을 찾을 수 없습니다.</div>;
    }

    const handleDelete = () => {
        deleteMarketItem(selectedItem.id);
        alert("상품이 삭제되었습니다.");
        navigate('/market');
    };

    const handleChat = () => {
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