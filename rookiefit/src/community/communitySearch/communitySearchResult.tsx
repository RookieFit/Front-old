import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CommunityPostGrid from '../communityComponents/communityPostGrid';
import { dummyPosts } from '../communityList/dummydata'; // dummyPosts 데이터 import

const CommunitySearchResult = (): JSX.Element => {
    const location = useLocation();
    const [filteredPosts, setFilteredPosts] = useState(dummyPosts);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const searchTerm = searchParams.get('search') || '';
        const category = searchParams.get('category') || '전체';

        const fetchSearchResults = () => {
            setLoading(true);
            try {
                const filtered = dummyPosts.filter((post) => {
                    const matchesCategory = category === '전체' || post.category === category;
                    const matchesSearchTerm =
                        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.content.toLowerCase().includes(searchTerm.toLowerCase());
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

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>검색 결과</h2>
            <CommunityPostGrid posts={filteredPosts} />
        </div>
    );
};

export default CommunitySearchResult;