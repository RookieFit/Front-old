import { useNavigate } from 'react-router-dom';
import WriteBox from '../components/writeBox';

const NoticeWrite = () => {
    const navigate = useNavigate();

    // 제출 처리 함수
    const handleSubmit = (title: string, detail: string, images: File[]) => {
        // 여러 이미지를 처리하는 로직 (예: API 호출)

        // 등록 후 페이지 이동
        navigate(`/community?category=공지&mode=grid`);
    };

    return (
        <WriteBox
            categories={['공지']} // 카테고리 배열로 전달
            headerTitle="공지 작성"
            headerContent="공지 사항을 작성하는 페이지입니다."
            onSubmit={handleSubmit} // onSubmit 함수에 images 배열 전달
            maxImages={5} // 최대 5개 이미지 업로드 가능하도록 설정
        />
    );
};

export default NoticeWrite;
