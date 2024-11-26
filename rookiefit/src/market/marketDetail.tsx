import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './marketDetail.css';
import { deleteMarketItem, marketItems } from './marketData';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface InfoRowProps {
    label: string;
    value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
    <div className="market-detail-info-row">
        <span className="market-detail-info-label">{label}</span>
        <span className="market-detail-info-value">{value}</span>
    </div>
);

const MarketDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();  // 페이지 이동을 위한 navigate 훅
    const selectedItem = marketItems.find(item => item.id === Number(id));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    const handleDelete = () => {
        if (selectedItem) {
            deleteMarketItem(selectedItem.id);  // 데이터 삭제
            alert("상품이 삭제되었습니다.");
            navigate('/market');  // 삭제 후 시장 목록 페이지로 이동
        }
    }

    const handleChat = () => {
        navigate('/market/chat')
    }

    if (!selectedItem) {
        return <div className="market-detail-error">상품을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="market-detail-wrapper">
            <div className="market-detail-header">
                <h1>상품 상세 정보</h1>
            </div>

            <div className="market-detail-content">
                {/* 이미지 영역 */}
                <div className="market-detail-image">
                    <Slider {...settings}>
                        {selectedItem.images?.map((image: string, index: number) => (
                            <div key={index}>
                                <img src={image} alt={`${selectedItem.title} ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* 정보 영역 */}
                <div className="market-detail-info">
                    <div className="market-detail-main-info">
                        <div className="market-detail-title-section">
                            <span className="market-detail-category-tag">
                                {selectedItem.category}
                            </span>
                            <h2>{selectedItem.title}</h2>
                        </div>
                        <div className="market-detail-user-info">
                            <div className="market-detail-user-name">{selectedItem.userName}</div>
                            <div className="market-detail-timestamp">{selectedItem.timestamp}</div>
                        </div>
                        <h3 className="market-detail-price">
                            ₩{selectedItem.price.toLocaleString()}
                        </h3>
                    </div>

                    <div className="market-detail-info-table">
                        <InfoRow label="상품상태" value={selectedItem.condition} />
                        <InfoRow label="배송방법" value={selectedItem.delivery} />
                        <InfoRow label="거래지역" value={selectedItem.location} />
                    </div>

                    <div className="market-detail-description">{selectedItem.description}</div>

                    <button className="market-detail-inquiry-button" onClick={handleChat}>
                        거래 문의 및 채팅
                    </button>

                    {/* 수정/삭제 버튼 */}
                    <div className="market-detail-author-buttons">
                        <button
                            className="market-detail-edit-button"
                            onClick={() => alert("수정 페이지로 이동합니다.")}
                        >
                            수정
                        </button>
                        <button
                            className="market-detail-delete-button"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketDetail;
