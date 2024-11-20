import './communityPostBox.css';

// 게시글 박스에 들어갈 데이터의 타입을 정의합니다.
interface Post {
    category: string; // 추가된 카테고리
    title: string;
    author: string;
    date: string;
    images: string[]; // 사진 3장
    content: string;
}

interface CommunityPostBoxProps {
    post: Post;
}

// React.FC 대신 function을 사용하여 컴포넌트를 정의
function CommunityPostBox({ post }: CommunityPostBoxProps) {
    return (
        <div className="post-box">
            {/* 카테고리 */}
            <p className="post-category">{post.category}</p>

            {/* 게시글 제목 */}
            <h3 className="post-title">{post.title}</h3>

            {/* 게시글 작성자 및 날짜 */}
            <div className="post-header">
                <p className="author"> {post.author}</p>
                <p className="date">{post.date}</p>
            </div>

            {/* 이미지 (최대 3장) */}
            <div className="post-images">
                {post.images.slice(0, 3).map((image, index) => (
                    <div
                        key={index}
                        className="post-image"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>

            {/* 게시글 본문 */}
            <p className="post-content">{post.content}</p>

            {/* 댓글 버튼 */}
            <button className="comment-button">댓글</button>
        </div>
    );
}

export default CommunityPostBox;
