import React, { useState } from 'react';
import './marketItemList.css';
import { useNavigate } from 'react-router-dom';
import { marketItems } from './marketData';
import CommunityPagination from '../community/communityComponents/communityPagination';
import CommunityFloatingButtons from '../community/communityComponents/communityFloatingButtons';

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
    const [selectedCategory, setSelectedCategory] = useState<'전체' | '판매' | '구매'>('전체');
    const itemsPerPage = 9; // 한 페이지에 9개의 아이템 표시

    const filteredItems = selectedCategory === '전체'
        ? marketItems
        : marketItems.filter(item => item.category === selectedCategory);

    // 페이지네이션 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // 카드 클릭 핸들러
    const handleCardClick = (e: React.MouseEvent, id: number) => {
        // 텍스트가 선택되어 있다면 클릭 이벤트 무시
        if (window.getSelection()?.toString()) {
            return;
        }
        navigate(`/market/detail/${id}`);
    };

    const handleCategoryChange = (category: '전체' | '판매' | '구매') => {
        setSelectedCategory(category);
        setCurrentPage(1); // 카테고리 변경시 첫 페이지로 이동
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="market-item-list-wrapper">
            <div className="market-item-list-header">
                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value as '전체' | '판매' | '구매')}
                    className="market-category-filter"
                >
                    <option value="전체">전체</option>
                    <option value="판매">판매</option>
                    <option value="구매">구매</option>
                </select>
            </div>
            <div className="market-item-list-grid">
                {currentItems.map((item) => (
                    <div
                        key={item.id}
                        className="market-item-list-grid-card"
                        onClick={(e) => handleCardClick(e, item.id)}
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
            <CommunityFloatingButtons onScrollToTop={scrollToTop} />
            <CommunityPagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MarketItemList;
