import React, { useState } from 'react';
import './seenFeedGridPhoto.css';
import PostGrid from '../../../../components/postGrid';
import { useNavigate } from 'react-router-dom';
import CommunityPagination from '../../../../community/communityComponents/communityPagination';

export interface Post {
    id: number;
    title: string;
    author: string;
    date: string;
    images: string[];
    content: string;
}

const SeenFeedGridPhoto = ({ posts }: { posts: Post[] }) => {
    const navigate = useNavigate();
    const [seenPage, setSeenPage] = useState(1);
    const postsPerPage = 9;

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
                className='seen-feed-photo-post-grid'
                posts={seenPosts}// Post 타입을 지정
                onPostClick={handlePostClick}
                renderItem={(post: Post) => (
                    <div className="seen-feed-photo-item">
                            {post.images[0] ? (
                                <img
                                    src={post.images[1]}
                                    alt={post.title}
                                    className="seen-feed-grid-image"
                                />
                            ) : null /* 이미지가 없으면 빈 컨테이너만 렌더링 */}
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

export default SeenFeedGridPhoto;
