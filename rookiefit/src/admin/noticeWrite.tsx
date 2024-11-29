import { useState, useRef } from 'react';
import CommunityHeader from "../community/communityComponents/communityHeader";
import './noticeWrite.css'; // CSS 파일 임포트
import { useNavigate } from 'react-router-dom';

const NoticeWrite = () => {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const navigate = useNavigate();

    // 파일 업로드 관련
    const inputEl = useRef<HTMLInputElement | null>(null);

    // 제목 입력 처리
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // 내용 입력 처리
    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetail(e.target.value);
    };

    // 등록 버튼 클릭 시 커뮤니티 리스트로 이동
    const handleSubmit = () => {
        // 공지 등록 처리 로직 (예: API 호출) 후 페이지 이동
        navigate(`/community?category=공지&mode=grid`);

    };

    return (
        <div className="notice-write-top-box">
            <CommunityHeader
                title="공지 작성"
                content="공지 사항을 작성하는 페이지입니다."
            />
            <div className="notice-write-inbox">
                <div className="notice-write-title-box">
                    {/* 카테고리는 고정된 텍스트로 "공지" */}
                    <div className="notice-write-dropdown-area">
                        <div className="notice-write-drop-box">
                            공지
                        </div>
                    </div>
                    <input
                        type="text"
                        className="notice-write-title"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <textarea
                    className="notice-write-detail"
                    placeholder="내용을 입력하세요"
                    value={detail}
                    onChange={handleDetailChange}
                />
                <div className="notice-write-under">
                    <section className="notice-write-file-upload">
                        <input
                            type="file"
                            className="notice-write-file-button"
                            accept="image/*"
                            ref={inputEl}
                        />
                    </section>
                    <input
                        type="button"
                        className="notice-write-upload-contents"
                        value="등록하기"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoticeWrite;
