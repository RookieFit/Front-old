import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위한 useNavigate 훅 임포트
import './administratorPage.css';  // 스타일 파일 임포트 (CSS)

function AdministratorPage() {
    const navigate = useNavigate();  // 페이지 이동을 위한 navigate 함수 사용

    // 공지 작성 페이지로 이동
    const handleNoticeCreateClick = () => {
        navigate('/admin/noticewrite');  // '/createNotice' 경로로 이동 (공지 작성 페이지)
    };

    // 트레이너 인증 페이지로 이동
    const handleTrainerAuthClick = () => {
        navigate('/trainerAuth');  // '/trainerAuth' 경로로 이동 (트레이너 인증 페이지)
    };

    return (
        <div className="admin-container">
            <h2>관리자 페이지</h2>

            <div className="admin-button-container">
                {/* 공지 작성 버튼 */}
                <button className="admin-button" onClick={handleNoticeCreateClick}>
                    공지 작성
                </button>

                {/* 트레이너 인증 버튼 */}
                <button className="admin-button" onClick={handleTrainerAuthClick}>
                    트레이너 인증
                </button>
            </div>
        </div>
    );
}

export default AdministratorPage;
