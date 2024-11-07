import './SignUpPage.css';

function SignUpPage() {
    
    return (
        <div id="sign-up-wrapper">
            <div className='signup_title'>회원 가입</div>
            
            <div className='name_container'>
                <div>이름</div>
                <input
                    type="text"
                    placeholder="이름을 입력해주세요">
                </input>
            </div>
        </div>
    );
}

export default SignUpPage;
