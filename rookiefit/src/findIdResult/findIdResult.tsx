import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './findIdResult.css';
import '../inputbox/inputbox';

const FindIdResult = (): JSX.Element => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLoginRedirect = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="findId-result-wrapper">
            <div className="findId-result-content">
                <h2 className="findId-result-text">당신의 아이디는</h2>
                {/* 아이디 결과 */}
                <h2 className="findId-result-text">입니다.</h2>
                <button
                    className="findId-result-login-button"
                    onClick={handleLoginRedirect} // Trigger the redirect on button click
                >
                    로그인하러 가기
                </button>
            </div>
        </div>
    );
}

export default FindIdResult;
