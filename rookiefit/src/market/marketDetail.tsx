import React from 'react';
import { useParams } from 'react-router-dom';
import './marketDetail.css';
import { marketItems } from './marketData';

const MarketDetail = () => {
    const { id } = useParams<{ id: string }>();
    const selectedItem = marketItems.find(item => item.id === Number(id));

    if (!selectedItem) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="market-detail-wrapper">
            <div className="market-detail-header">
            </div>

            <div className="market-detail-content">
                <div className="market-detail-image">
                    <img src={selectedItem.image} alt={selectedItem.title} />
                </div>

                <div className="market-detail-info">
                    <div className="market-detail-main-info">
                        <div className="market-detail-title-section">
                            <span className="market-detail-category-tag">{selectedItem.category}</span>
                            <h2 className="market-detail-main-title">{selectedItem.title}</h2>
                        </div>
                        <div className="market-detail-user-info">
                            <div className="market-detail-user-name">{selectedItem.userName}</div>
                            <div className="market-detail-timestamp">{selectedItem.timestamp}</div>
                        </div>
                        <h3 className="market-detail-price">₩{selectedItem.price.toLocaleString()}</h3>
                    </div>

                    <div className="market-detail-info-table">
                        <div className="market-detail-info-row">
                            <span className="market-detail-info-label">상품상태</span>
                            <span className="market-detail-info-value">{selectedItem.condition}</span>
                        </div>
                        <div className="market-detail-info-row">
                            <span className="market-detail-info-label">배송방법</span>
                            <span className="market-detail-info-value">{selectedItem.delivery}</span>
                        </div>
                        <div className="market-detail-info-row">
                            <span className="market-detail-info-label">거래지역</span>
                            <span className="market-detail-info-value">{selectedItem.location}</span>
                        </div>
                    </div>

                    <div className="market-detail-description">
                        {selectedItem.description}
                    </div>

                    <button className="market-detail-inquiry-button">
                        거래 문의 및 채팅
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketDetail;