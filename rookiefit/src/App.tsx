import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/header/header';
import CalenderPage from './calendar/calenderPage';
import LoginPage from './logIn/LoginPage';
import SignUpPage from './signup/signUpPage';
import FindId from './findId/findId';
import PasswordReset from './passwordReset/passwordReset';
import MyPage from './mypage/myPage';
import MyPageEdit from './mypage/myPageEdit';
import CommunityList from './community/communityList/communityList';
import CommunityDetail from './community/communityDetail/communityDetail';
import CommunityWrite from './community/communityWrite/communityWrite';
import FindPassword from './findPassword/findPassword';
import FindIdResult from './findIdResult/findIdResult' // 비밀번호 찾기 페이지
import FoodPage from './food/foodPage';

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
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/calendar" element={<CalenderPage />} />
          <Route path="/calendar/write" element={<CalenderPage />} /> {/* /calendar/write 경로 추가 */}
          <Route path="/calendar/detail" element={<CalenderPage />} /> {/* /calendar/write 경로 추가 */}
          <Route path="/community" element={<CommunityList />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/detail" element={<CommunityDetail />} />
          <Route path="/diet" element={<FoodPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
