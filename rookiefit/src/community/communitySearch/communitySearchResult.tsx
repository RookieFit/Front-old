import React, { useState, useEffect } from 'react'; // React와 상태 관리 및 사이드 이펙트 훅 import
import { useLocation } from 'react-router-dom'; // 현재 URL 정보를 가져오는 훅
import CommunityPostGrid from '../communityComponents/communityPostGrid'; // 게시글을 그리드 형태로 보여주는 컴포넌트 import
import { dummyPosts } from '../communityList/dummydata'; // 게시글의 더미 데이터 import
import './CommunitySearchResult.css'; // 해당 컴포넌트의 스타일 파일 import

// 검색 결과를 보여주는 CommunitySearchResult 컴포넌트
const CommunitySearchResult = (): JSX.Element => {
    const location = useLocation(); // 현재 URL 및 쿼리스트링을 가져오기 위한 훅
    const [filteredPosts, setFilteredPosts] = useState(dummyPosts); // 필터링된 게시글을 저장할 상태
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태를 나타내는 상태
    const [error, setError] = useState<string | null>(null); // 에러 메시지를 저장하는 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 상태
    const [category, setCategory] = useState('전체'); // 선택된 카테고리를 저장하는 상태

    // 컴포넌트가 렌더링될 때마다 URL의 쿼리스트링을 기반으로 상태를 업데이트하는 useEffect
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search); // URLSearchParams로 쿼리스트링 파싱
        const searchTermFromUrl = searchParams.get('search') || ''; // 쿼리스트링에서 'search' 파라미터 값 추출
        const categoryFromUrl = searchParams.get('category') || '전체'; // 'category' 파라미터 값 추출 (기본값: '전체')

        setSearchTerm(searchTermFromUrl); // 검색어 상태 업데이트
        setCategory(categoryFromUrl); // 카테고리 상태 업데이트

        const fetchSearchResults = () => {
            setLoading(true); // 로딩 상태를 true로 설정
            try {
                // 더미 데이터를 검색 조건에 맞게 필터링
                const filtered = dummyPosts.filter((post) => {
                    const matchesCategory = categoryFromUrl === '전체' || post.category === categoryFromUrl; // 선택된 카테고리와 일치 여부 확인
                    const matchesSearchTerm =
                        post.title.toLowerCase().includes(searchTermFromUrl.toLowerCase()) || // 제목에 검색어 포함 여부 확인
                        post.content.toLowerCase().includes(searchTermFromUrl.toLowerCase()); // 내용에 검색어 포함 여부 확인
                    return matchesCategory && matchesSearchTerm; // 카테고리와 검색어 조건 모두 충족하는 게시글 반환
                });
                setFilteredPosts(filtered); // 필터링된 게시글 상태 업데이트
            } catch (error) {
                console.error('An error occurred:', error); // 에러 발생 시 콘솔 출력
                setError('검색 중 오류가 발생했습니다.'); // 에러 메시지 상태 업데이트
            } finally {
                setLoading(false); // 로딩 상태를 false로 설정
            }
        };

        fetchSearchResults(); // 검색 결과를 가져오는 함수 실행
    }, [location.search]); // location.search가 변경될 때마다 useEffect 실행

    // 로딩 상태일 때 보여줄 UI
    if (loading) return <p className="loading-message">로딩 중...</p>;
    // 에러가 발생했을 때 보여줄 UI
    if (error) return <p className="error-message">{error}</p>;

    // 기본 렌더링 결과
    return (
        <div>
            {/* 검색 결과 제목 */}
            <h2 className="search-result-title">
                "{category}" 카테고리에서 "{searchTerm}" 검색 결과입니다.
            </h2>
            {/* 필터링된 게시글이 있을 경우 게시글 그리드 출력, 없으면 메시지 출력 */}
            {filteredPosts.length > 0 ? (
                <CommunityPostGrid posts={filteredPosts} /> // 필터링된 게시글을 보여주는 컴포넌트
            ) : (
                <p className="no-result-message">검색 결과가 없습니다.</p> // 검색 결과가 없을 때 출력되는 메시지
            )}
        </div>
    );
};

export default CommunitySearchResult; // 컴포넌트 export
