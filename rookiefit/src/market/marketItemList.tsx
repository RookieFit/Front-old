import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostGrid from '../components/postGrid'; // PostGrid 컴포넌트 가져오기
import CommunityPagination from '../community/communityComponents/communityPagination';
import CommunityFloatingButtons from '../community/communityComponents/communityFloatingButtons';
import { marketItems, MarketItem } from './marketData'; // MarketItem 타입과 데이터 가져오기
import './marketItemList.css';

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
    const handlePostClick = (id: number) => {
        navigate(`/market/detail/${id}`);
    };

    const handleCategoryChange = (category: '전체' | '판매' | '구매') => {
        setSelectedCategory(category);
        setCurrentPage(1); // 카테고리 변경시 첫 페이지로 이동
    };

    const handleWritePost = () => {
        navigate('/market/write');
    };

    const handleSearch = () => {
        navigate('/market/search');
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

            <PostGrid<MarketItem>
                posts={currentItems} // MarketItem 타입에 맞는 데이터 전달
                onPostClick={handlePostClick} // 클릭 시 처리 함수 전달
                renderItem={(item: MarketItem) => (
                    <div className="market-item-list-grid-card" onClick={() => handlePostClick(item.id)}>
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
                )}
            />

            <CommunityFloatingButtons onWritePost={handleWritePost} onSearch={handleSearch} />
            <CommunityPagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MarketItemList;
