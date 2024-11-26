import React, { useState } from 'react';
import './marketItemList.css';
import CommunityPagination from '../community/communityComponents/communityPagination';
import { useNavigate } from 'react-router-dom';
import { marketItems } from './marketData';

// 마켓 아이템 타입 정의
export interface MarketItem {
    id: number;
    category: '판매' | '구매';
    title: string;
    location: string;
    price: number;
    image: string;
    timestamp: string;
}

const MarketItemList = () => {
    const navigate = useNavigate();

    // 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // 한 페이지에 9개의 아이템 표시

    // 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = marketItems.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // 카드 클릭 핸들러
    const handleCardClick = (id: number) => {
        navigate(`/market/detail/${id}`);
    };

    return (
        <div className="market-item-list-wrapper">
            <div className="market-item-list-grid">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        className="market-item-list-grid-card"
                        onClick={() => handleCardClick(item.id)}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="market-item-list-grid-image"
                        />
                        <div className="market-item-list-grid-details">
                            <span className="market-item-category">{item.category}</span>
                            <h3>{item.title}</h3>
                            <p className="market-item-timestamp">{item.timestamp}</p>
                            <p className="market-item-location">{item.location}</p>
                            <p className="market-item-price">
                                {new Intl.NumberFormat('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                }).format(item.price)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <CommunityPagination
                currentPage={currentPage}
                totalPages={Math.ceil(marketItems.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MarketItemList;
