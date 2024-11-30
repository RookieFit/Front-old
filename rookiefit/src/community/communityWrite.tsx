import { useNavigate } from 'react-router-dom';
import WriteBox from '../components/writeBox'; // WriteBox 컴포넌트 import

const CommunityWrite = () => {
    const menuItems = ['전체', '바프', '고민', '정보', '친목', '공지'];

    // 페이지 이동
    const navigate = useNavigate();
    const communityList = () => {
        navigate('/community'); // 등록 후 커뮤니티 목록으로 이동
    };

    // 등록 처리 함수 (WriteBox의 onSubmit 처리)
    const handleSubmit = (title: string, detail: string, file?: File) => {
        console.log('제목:', title);
        console.log('내용:', detail);
        if (file) {
            console.log('파일:', file.name);
        }

        // 데이터 처리 로직 추가 (예: 서버로 전송 등)
        communityList(); // 데이터 전송 후 커뮤니티 목록 페이지로 이동
    };

    return (
        <div className="write-top-box">
            <div className="community-write-inbox">
                <WriteBox
                    categories={menuItems} // 카테고리 전달
                    onSubmit={handleSubmit} // 제목, 내용, 파일을 처리하는 함수 전달
                    headerTitle="새 게시물 작성" // WriteBox에 헤더 제목 전달
                    headerContent="게시판에 새로운 글을 작성해 주세요." // WriteBox에 헤더 내용 전달
                />
            </div>
        </div>
    );
};

export default CommunityWrite;
