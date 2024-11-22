import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyPosts } from '../communityList/dummydata';
import './communityDetail.css';

const CommunityDetail = () => {
    const { id } = useParams<{ id: string }>(); // URL에서 게시물 ID 가져오기
    const navigate = useNavigate();

    // 게시물 ID를 기반으로 게시물 데이터 가져오기
    const post = dummyPosts.find((p) => p.id === Number(id));

    // 게시물이 없을 경우 처리
    if (!post) {
        return (
            <div className="community-detail-container">
                <h2>게시물을 찾을 수 없습니다.</h2>
                <button onClick={() => navigate('/community')} className="go-back-button">
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="community-detail-container">
            <div className="detail-header">
                <h1>{post.title}</h1>
                <button onClick={() => navigate('/community')} className="go-back-button">
                    목록으로 돌아가기
                </button>
            </div>
            <div className="detail-body">
                <p><strong>작성자:</strong> {post.author}</p>
                <p><strong>카테고리:</strong> {post.category}</p>
                <p><strong>내용:</strong></p>
                <p>{post.content}</p>
            </div>
        </div>
    );
};

export default CommunityDetail;
