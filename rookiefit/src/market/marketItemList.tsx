import React, { useState } from 'react';
import './marketItemList.css'; // 스타일 파일
import CommunityPagination from '../community/communityComponents/communityPagination'; // 기존 페이지네이션 컴포넌트 사용

// 마켓 아이템 타입 정의
export interface MarketItem {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

const MarketItemList = () => {
    // 더미 데이터 생성
    const marketItems: MarketItem[] = [
        { id: 1, name: '아이템 1', price: 1000000000, image: 'https://via.placeholder.com/150', description: '아이템 1 설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명' },
        { id: 2, name: '아이템 2', price: 20000, image: 'https://via.placeholder.com/150', description: '아이템 2 설명' },
        { id: 3, name: '아이템 3', price: 15000, image: 'https://via.placeholder.com/150', description: '아이템 3 설명' },
        { id: 4, name: '아이템 4', price: 12000, image: 'https://via.placeholder.com/150', description: '아이템 4 설명' },
        { id: 5, name: '아이템 5', price: 30000, image: 'https://via.placeholder.com/150', description: '아이템 5 설명' },
        { id: 6, name: '아이템 6', price: 8000, image: 'https://via.placeholder.com/150', description: '아이템 6 설명' },
        { id: 7, name: '아이템 7', price: 25000, image: 'https://via.placeholder.com/150', description: '아이템 7 설명' },
        { id: 8, name: '아이템 8', price: 17000, image: 'https://via.placeholder.com/150', description: '아이템 8 설명' },
        { id: 9, name: '아이템 9', price: 5000, image: 'https://via.placeholder.com/150', description: '아이템 9 설명' },
        { id: 10, name: '아이템 10', price: 22000, image: 'https://via.placeholder.com/150', description: '아이템 10 설명' },
    ];

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

    return (
        <div className='market-item-list-wrapper'>
            <div className="market-item-list-grid">
                {currentItems.map((item) => (
                    <div key={item.id} className="market-item-list-grid-card">
                        <img src={item.image} alt={item.name} className="market-item-list-grid-image" />
                        <div className="market-item-list-grid-details">
                            <h3>{item.name}</h3>
                            <p>{item.description.slice(0, 35)}...</p>
                            <p><strong>₩{item.price.toLocaleString()}</strong></p>
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
