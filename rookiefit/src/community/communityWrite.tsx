import { useNavigate } from 'react-router-dom';
import WriteBox from '../components/writeBox';

const CommunityWrite = () => {
    const navigate = useNavigate();

    // 제출 처리 함수
    const handleSubmit = (title: string, detail: string, images: File[]) => {
        // 여러 이미지를 처리하는 로직 (예: API 호출)

        // 등록 후 페이지 이동
        navigate(`/community?category=공지&mode=grid`);
    };

    return (
        <WriteBox
            categories={['바프', '고민', '정보', '친목']} // 카테고리 배열로 전달
            onSubmit={handleSubmit} // onSubmit 함수에 images 배열 전달
            maxImages={5} // 최대 5개 이미지 업로드 가능하도록 설정
        />
    );
};

export default CommunityWrite;
