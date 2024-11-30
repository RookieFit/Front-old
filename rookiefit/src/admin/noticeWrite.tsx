import { useNavigate } from 'react-router-dom';
import WriteBox from '../components/writeBox';

const NoticeWrite = () => {
    const navigate = useNavigate();

    // 제출 처리 함수
    const handleSubmit = (title: string, detail: string, file?: File) => {
        // 공지 등록 처리 로직 (예: API 호출)
        console.log('제목:', title);
        console.log('내용:', detail);
        console.log('파일:', file);

        // 등록 후 페이지 이동
        navigate(`/community?category=공지&mode=grid`);
    };

    return (
        <WriteBox
            categories={['공지']} // 카테고리 배열로 전달
            headerTitle="공지 작성"
            headerContent="공지 사항을 작성하는 페이지입니다."
            onSubmit={handleSubmit}
        />
    );
};

export default NoticeWrite;
