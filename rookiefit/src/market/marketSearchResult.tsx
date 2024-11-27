import React from 'react';
import { useSearchResults } from '../components/useSearchResult';
import { marketItems } from './marketData';
import './marketSearchResult.css'
import '../community/communitySearch/communitySearchResult.css'

const MarketSearchResult = () => {
    const { filteredItems, loading, error, searchTerm } = useSearchResults({
        items: marketItems,
        filterFn: (item, searchTerm) => {
            return (
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        },
    });

    if (loading) return <p className="loading-message">검색 중...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="market-search-result-wrapper">
            <h2 className="search-result-title">
                "{searchTerm}" 검색 결과입니다.
            </h2>
            <div className="market-item-list-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="market-item-list-grid-card">
                            <img src={item.image} alt={item.title} className="market-item-list-grid-image" />
                            <div className="market-item-list-grid-details">
                                <span className="market-item-category">{item.category}</span>
                                <h3>{item.title}</h3>
                                <p className="market-item-location">{item.location}</p>
                                <p className="market-item-timestamp">{item.timestamp}</p>
                                <p className="market-item-price">
                                    {new Intl.NumberFormat('ko-KR', {
                                        style: 'currency',
                                        currency: 'KRW',
                                    }).format(item.price)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-result-message">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MarketSearchResult;
