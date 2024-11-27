import React from 'react';
import { useSearchResults } from '../../components/useSearchResult';
import CommunityPostGrid from '../communityComponents/communityPostGrid';
import { dummyPosts } from '../communityList/dummydata';
import './communitySearchResult.css'

const CommunitySearchResult = (): JSX.Element => {
    const { filteredItems, loading, error, searchTerm, category } = useSearchResults({
        items: dummyPosts,
        filterFn: (post, searchTerm, category) => {
            const matchesCategory = category === '전체' || post.category === category;
            const matchesSearchTerm =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearchTerm;
        },
    });

    // 로딩 상태일 때 보여줄 UI
    if (loading) return <p className="loading-message">로딩 중...</p>;
    // 에러가 발생했을 때 보여줄 UI
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <h2 className='search-result-title'>
                "{category}" 카테고리에서 "{searchTerm}" 검색 결과입니다.
            </h2>
            {filteredItems.length > 0 ? (
                <CommunityPostGrid posts={filteredItems} />
            ) : (
                <p className="no-result-message">검색 결과가 없습니다.</p> // 검색 결과가 없을 때 출력되는 메시지
            )}
        </div>
    );
};

export default CommunitySearchResult;
