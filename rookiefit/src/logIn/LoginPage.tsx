import { useNavigate } from 'react-router-dom';
import './loginPage.css';


function LoginPage() {
    const navigate = useNavigate();
    /*  로그인 */
    const idClickHandler = () => {
        alert("click");
    }
     /*  아이디/비번 찾기 */
    const findClickHandler = () => {
        alert("find id and password");
    }
    /* 간편 로그인 클릭 */
    const naverClickHandler = () => {
        alert("naver login~~");
    }
    const kakaoClickHandler = () => {
        alert("kakao login~~");
    }
    const googleClickHandler = () => {
        alert("google login~~");
    }

     /*  회원가입 */
     const signupClickHandler = () => {
        navigate("/signup");
    };

    return (
        <div id="log-in-wrapper">
            <div className='login_title'>로그인</div>

            {/* ID Input Field */}
            <div >
                <input
                    className='id_password_box'
                    type="text"
                    placeholder="이메일 아이디"       
                />
            </div>

            {/* Password Input Field */}
            <div >
                <input
                    className='id_password_box'
                    type="password"
                    placeholder="Password"
                />
            </div>

            {/* Login Button */}
            <div >
                <button className=' login_button -right,' onClick={idClickHandler}>로그인</button>
            </div>
            {/* Forgot ID / Password */}
            <button className='find_id_password_button' onClick={findClickHandler}>아이디 찾기 | 비밀번호 찾기</button>

            <div className='underline'></div>

            {/* Sign Up Button */}
            <div>
                <button className='sign_in_button' onClick={signupClickHandler}>회원가입</button>
            </div>

            {/* Social Login Section */}
            <div className='easy_login_text'>간편 로그인</div>
            <div className='sns_login_container'>
                <button className='naver_login' onClick={naverClickHandler}></button>
                <button className='kakao_login' onClick={kakaoClickHandler}></button>
                <button className='google_login'onClick={googleClickHandler}></button>
            </div>
        </div>
    );
}

export default LoginPage;
