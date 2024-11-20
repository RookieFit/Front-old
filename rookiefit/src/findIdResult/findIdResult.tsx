import { useNavigate } from 'react-router-dom';
import './findIdResult.css';
import '../inputBox2/inputBox';

const FindIdResult = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/signin');
    };

    const handlePasswordResetRedirect = () => {
        navigate('/passwordreset');
    };

    return (
        <div className="find-id-result-wrapper">
            <div className="find-id-result-content">
                <h2 className="find-id-result-text">당신의 아이디는 입니다.</h2>
                <div className="button-container"> {/* 버튼들을 가로로 정렬할 컨테이너 */}
                    <button
                        className="find-id-result-button"
                        onClick={handleLoginRedirect}
                    >
                        로그인하러 가기
                    </button>
                    <button
                        className="find-id-result-button"
                        onClick={handlePasswordResetRedirect}
                    >
                        비밀번호 재설정
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FindIdResult;
