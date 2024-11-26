import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CommunityPostGrid from '../communityComponents/communityPostGrid';
import { dummyPosts } from '../communityList/dummydata';
import './CommunitySearchResult.css';

const CommunitySearchResult = (): JSX.Element => {
    const location = useLocation();
    const [filteredPosts, setFilteredPosts] = useState(dummyPosts);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('전체');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTermFromUrl = searchParams.get('search') || '';
        const categoryFromUrl = searchParams.get('category') || '전체';

        setSearchTerm(searchTermFromUrl);
        setCategory(categoryFromUrl);

        const fetchSearchResults = () => {
            setLoading(true);
            try {
                const filtered = dummyPosts.filter((post) => {
                    const matchesCategory = categoryFromUrl === '전체' || post.category === categoryFromUrl;
                    const matchesSearchTerm =
                        post.title.toLowerCase().includes(searchTermFromUrl.toLowerCase()) ||
                        post.content.toLowerCase().includes(searchTermFromUrl.toLowerCase());
                    return matchesCategory && matchesSearchTerm;
                });
                setFilteredPosts(filtered);
            } catch (error) {
                console.error('An error occurred:', error);
                setError('검색 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [location.search]);

    if (loading) return <p className="loading-message">로딩 중...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <h2 className="search-result-title">
                "{category}" 카테고리에서 "{searchTerm}" 검색 결과입니다.
            </h2>
            {filteredPosts.length > 0 ? (
                <CommunityPostGrid posts={filteredPosts} />
            ) : (
                <p className="no-result-message">검색 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default CommunitySearchResult;