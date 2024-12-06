import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CommunityPostGrid from '../communityComponents/communityPostGrid';
import { dummyPosts } from '../communityList/dummydata';
import './communitySearchResult.css';

const CommunitySearchResult = (): JSX.Element => {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [searchParams] = useSearchParams(); // URL의 쿼리 파라미터를 읽어옴

    useEffect(() => {
        setLoading(true);

        try {
            // URL에서 쿼리 파라미터 추출
            const title = searchParams.get('title') || '';
            const author = searchParams.get('author') || '';
            const content = searchParams.get('content') || '';
            const method = searchParams.get('method') || '';

            // 필터링 로직
            const filtered = dummyPosts.filter((post) => {
                if (method === '제목') {
                    return post.title.toLowerCase().includes(title.toLowerCase());
                }
                if (method === '작성자') {
                    return post.author.toLowerCase().includes(author.toLowerCase());
                }
                if (method === '글내용') {
                    return post.content.toLowerCase().includes(content.toLowerCase());
                }
                if (method === '제목+작성자+글내용') {
                    return (
                        post.title.toLowerCase().includes(title.toLowerCase()) ||
                        post.author.toLowerCase().includes(author.toLowerCase()) ||
                        post.content.toLowerCase().includes(content.toLowerCase())
                    );
                }
                return false;
            });

            setFilteredItems(filtered);
        } catch (err) {
            setError('검색 결과를 가져오는 도중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    // 로딩 상태
    if (loading) return <p className="loading-message">로딩 중...</p>;

    // 에러 상태
    if (error) return <p className="error-message">{error}</p>;

    // 결과 UI
    return (
        <div>
            <h2 className="search-result-title">검색 결과</h2>
            {filteredItems.length > 0 ? (
                <CommunityPostGrid posts={filteredItems} />
            ) : (
                <p className="no-result-message">검색 결과가 없습니다.</p>
            )}
        </div>
    );
};

export default CommunitySearchResult;
