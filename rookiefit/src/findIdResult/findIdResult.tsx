import { useNavigate } from 'react-router-dom';
import './findIdResult.css';
import '../inputbox/inputbox';

const FindIdResult = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handlePasswordResetRedirect = () => {
        navigate('/password-reset');
    };

    return (
        <div className="findId-result-wrapper">
            <div className="findId-result-content">
                <h2 className="findId-result-text">당신의 아이디는</h2>
                <h2 className="findId-result-text">입니다.</h2>
                <div className="button-container"> {/* 버튼들을 가로로 정렬할 컨테이너 */}
                    <button
                        className="findId-result-button"
                        onClick={handleLoginRedirect}
                    >
                        로그인하러 가기
                    </button>
                    <button
                        className="findId-result-button"
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
