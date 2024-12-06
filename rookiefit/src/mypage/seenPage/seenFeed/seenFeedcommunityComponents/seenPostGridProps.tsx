import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './seenPostGridProps.css';
import CommunityPagination from '../../../../community/communityComponents/communityPagination';
import PostGrid from '../../../../components/postGrid';

// 게시글 타입 정의
export interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
}

const SeenPostGridProps = ({ posts }: { posts: Post[] }) => {
    const navigate = useNavigate();
    const [seenPage, setSeenPage] = useState(1);
    const postsPerPage = 3;

    const indexOfLastPost = seenPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const seenPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (newPage: number) => {
        setSeenPage(newPage);
    };

    const handlePostClick = (id: number) => {
        navigate(`/community/detail/${id}`);
    };
    return (
        <div>
            <PostGrid<Post>
                className='seen-feed-post-grid'
                posts={seenPosts}// Post 타입을 지정
                onPostClick={handlePostClick}
                renderItem={(post: Post) => (
                    <div className="seen-feed-post-grid-item">
                        <div className="seen-feed-post-grid-entry-thumbnaill">
                            {post.images[0] ? (
                                <img
                                    src={post.images[1]}
                                    alt={post.title}
                                    className="seen-feed-grid-image"
                                />
                            ) : null /* 이미지가 없으면 빈 컨테이너만 렌더링 */}
                        </div>
                        <div className='seen-feed-grid-detail'>
                            <h3>{post.title}</h3>
                            <p>{post.date}</p>
                            <p>{post.content.slice(0, 50)}...</p>
                        </div>
                    </div>
                )}
            />
            <CommunityPagination
                currentPage={seenPage}
                totalPages={Math.ceil(posts.length / postsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default SeenPostGridProps;