import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { dummyPosts } from '../../../../community/communityList/dummydata';
import PostGrid from '../../../../components/postGrid';
import './seenFeedGridBox.css'; // 새로운 CSS 파일을 만들어 스타일을 정의합니다

type Category = '전체' | '바프' | '고민' | '정보' | '친목' | '공지';
const CATEGORIES: Category[] = ['전체', '바프', '고민', '정보', '친목', '공지'];
const POSTS_PER_PAGE = 3; // 한 번에 로드할 게시물 수를 3개로 변경

const SeenFeedGridBox = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [seenPosts, setSeenPosts] = useState<typeof dummyPosts>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getFilteredPosts = useCallback(() => {
    return selectedCategory === '전체'
      ? dummyPosts
      : dummyPosts.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  const loadPosts = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const filteredPosts = getFilteredPosts();
      const startIndex = page * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      const newPosts = filteredPosts.slice(startIndex, endIndex);
      if (newPosts.length > 0) {
        setSeenPosts(prev => [...prev, ...newPosts].slice(0, POSTS_PER_PAGE)); // 최대 3개만 유지
        setPage(prev => prev + 1);
        setHasMore(endIndex < filteredPosts.length);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    })
}, [page, loading, hasMore, getFilteredPosts]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category') as Category;
    if (CATEGORIES.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [location]);

  useEffect(() => {
    setSeenPosts([]);
    setPage(0);
    setHasMore(true);
    loadPosts();
  }, [selectedCategory]);

  const handlePostClick = (id: number) => {
    console.log(`Post clicked: ${id}`);
  };

  const renderPostItem = (post) => (
    <div className="seen-feed-item">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <span>{post.category}</span>
    </div>
  );

  return (
    <div className="seen-feed-grid-box">
      <PostGrid
        posts={seenPosts}
        onPostClick={handlePostClick}
        renderItem={renderPostItem}
      />
    </div>
  );
};

export default SeenFeedGridBox;