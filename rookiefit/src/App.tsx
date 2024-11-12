import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/header/header';
import CalenderPage from './calendar/calenderPage';
import LoginPage from './logIn/LoginPage';
import SignUpPage from './signup/signUpPage';
import MyPage from './mypage/myPage';
import MyPageEdit from './mypage/myPageEdit';



function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path="/mypageedit" element={<MyPageEdit />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/calendar" element={<CalenderPage />} />
          <Route path="/calendar/write" element={<CalenderPage />} /> {/* /calendar/write 경로 추가 */}
          <Route path="/diet" element={<></>} />
          <Route path="/community" element={<></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
