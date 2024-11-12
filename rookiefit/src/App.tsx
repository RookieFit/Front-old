import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/header/header';
import CalenderPage from './calendar/calenderPage';
import LoginPage from './logIn/LoginPage';
import SignUpPage from './signup/signUpPage';
import FindId from './findId/findId';  // 아이디 찾기 페이지
import MyPage from './mypage/myPage';
import MyPageEdit from './mypage/myPageEdit';
import FindPassword from './findPassword/findPassword';
import FindIdResult from './findIdResult/findIdResult' // 비밀번호 찾기 페이지

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/mypageedit" element={<MyPageEdit />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findidresult" element={<FindIdResult />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/calendar" element={<CalenderPage />} />
          <Route path="/calendar/write" element={<CalenderPage />} /> {/* /calendar/write 경로 추가 */}
          <Route path="/calendar/detail" element={<CalenderPage />} /> {/* /calendar/write 경로 추가 */}
          <Route path="/diet" element={<></>} />
          <Route path="/community" element={<></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
