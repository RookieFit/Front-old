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

            <div className='name_container'>
                <div>아이디</div>
                <input
                    type="text"
                    placeholder="아이디를 입력해주세요">
                </input>
            </div>

            <div className='name_container'>
                <div>패스워드</div>
                <input
                    type="text"
                    placeholder="패스워드를 입력해주세요">
                </input>
            </div>

            <div className='name_container'>
                <div>휴대전화</div>
                <input
                    type="text"
                    placeholder="전화번호를 입력해주세요">
                </input>
            </div>

            <div className='name_container'>
                <div>인증번호</div>
                <input
                    type="text"
                    placeholder="인증번호를 입력해주세요">
                </input>
                
            <div className='underline'></div>


            </div>
        </div>
    );
}

export default SignUpPage;
