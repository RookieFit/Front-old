import React from 'react';
import { useParams } from 'react-router-dom';
import './marketDetail.css';
import { marketItems } from './marketData';

const MarketDetail = () => {
    // URL 파라미터에서 상품 ID를 가져옴
    const { id } = useParams<{ id: string }>();
    // ID와 일치하는 상품 정보를 찾음
    const selectedItem = marketItems.find(item => item.id === Number(id));

    // 상품이 없을 경우 에러 메시지 표시
    if (!selectedItem) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    return (
        // 전체 페이지 래퍼
        <div className="market-detail-wrapper">
            {/* 상단 헤더 영역 */}
            <div className="market-detail-header">
            </div>

            {/* 메인 컨텐츠 영역 */}
            <div className="market-detail-content">
                {/* 상품 이미지 영역 */}
                <div className="market-detail-image">
                    <img src={selectedItem.image} alt={selectedItem.title} />
                </div>

                {/* 상품 정보 영역 */}
                <div className="market-detail-info">
                    {/* 기본 정보 (카테고리, 제목, 유저정보, 가격) */}
                    <div className="market-detail-main-info">
                        <div className="market-detail-title-section">
                            <span className="market-detail-category-tag">{selectedItem.category}</span>
                            <h2>{selectedItem.title}</h2>
                        </div>
                        {/* 판매자 정보와 등록 시간 */}
                        <div className="market-detail-user-info">
                            <div className="market-detail-user-name">{selectedItem.userName}</div>
                            <div className="market-detail-timestamp">{selectedItem.timestamp}</div>
                        </div>
                        <h3 className="market-detail-price">₩{selectedItem.price.toLocaleString()}</h3>
                    </div>

                    {/* 상품 상세 정보 테이블 */}
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

                    {/* 상품 설명 */}
                    <div className="market-detail-description">
                        {selectedItem.description}
                    </div>

                    {/* 채팅 버튼 */}
                    <button className="market-detail-inquiry-button">
                        거래 문의 및 채팅
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarketDetail;