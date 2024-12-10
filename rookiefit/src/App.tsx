import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './layout/header/header';
import CalenderPage from './calendar/calenderPage';
import SigninPage from './signIn/signInPage';
import SignUpPage from './signUp/signUpPage';
import FindId from './findId/findId';
import PasswordReset from './passwordReset/passwordReset';
import MyPage from './mypage/myPage';
import CommunityList from './community/communityList/communityList';
import CommunityDetail from './community/communityDetail/communityDetail';
import CommunityWrite from './community/communityWrite';
import FindPassword from './findPassword/findPassword';
import FindIdResult from './findIdResult/findIdResult';
import FoodPage from './food/foodPage';
import SeenPage from './mypage/seenPage/seenPage';
import MarketPage from './market/marketPage';
import MarketDetail from './market/marketDetail';
import MarketPost from './market/marketPost';
import CommunitySearch from './community/communitySearch/communitySearch'; // CommunitySearch import 추가
import CommunitySearchResult from './community/communitySearch/communitySearchResult'; // 검색 결과 페이지 추가
import MarketChatPage from './market/marketChatPage';
import MarketSearch from './market/marketSearch';
import MarketSearchResult from './market/marketSearchResult';
import Home from './home/home';
import AdministratorPage from './admin/administratorPage';
import NoticeWrite from './admin/noticeWrite';
import TrainerAuth from './admin/trainerAuth';
import { useEffect, useState } from 'react';
import { checkLoginStatus } from './authCheck/authUtils';
import FoodAddPage from './food/foodComponents/foodAddPage';
import UserProfile from './userProfile/userProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyLogin = async () => {
      const loginStatus = await checkLoginStatus();
      console.log('Login Status:', loginStatus); // 로그 추가
      if (!loginStatus) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };

    verifyLogin();
  }, [navigate]);

  return (
    <div>
      <Header />
      <Routes>
        {/* 로그인 없이 접근 가능한 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/findidresult" element={<FindIdResult />} />
        <Route path="/passwordreset" element={<PasswordReset />} />

        {/* 인증된 사용자만 접근 가능한 페이지 */}
        <Route path="/seenPage" element={<SeenPage />} />
        <Route path="/mypage" element={isLoggedIn ? <MyPage /> : <SigninPage />} />
        <Route path="/userProfile" element={isLoggedIn ? <UserProfile /> : <SigninPage />} />
        <Route path="/calendar" element={isLoggedIn ? <CalenderPage /> : <SigninPage />} />
        <Route path="/calendar/write" element={isLoggedIn ? <CalenderPage /> : <SigninPage />} />
        <Route path="/calendar/detail" element={isLoggedIn ? <CalenderPage /> : <SigninPage />} />
        <Route path="/community" element={isLoggedIn ? <CommunityList /> : <SigninPage />} />
        <Route path="/community/write" element={isLoggedIn ? <CommunityWrite /> : <SigninPage />} />
        <Route path="/community/detail/:id" element={isLoggedIn ? <CommunityDetail /> : <SigninPage />} />
        <Route path="/community/grid" element={isLoggedIn ? <CommunityList /> : <SigninPage />} />
        <Route path="/community/grid/bodyprofile" element={isLoggedIn ? <CommunityList /> : <SigninPage />} />
        <Route path="/community/grid/concern" element={isLoggedIn ? <CommunityList /> : <SigninPage />} />
        <Route path="/community/grid/information" element={isLoggedIn ? <CommunityList /> : <SigninPage />} />
        <Route path="/community/grid/friendship" element={isLoggedIn ? <CommunityList /> : <SigninPage />} />
        <Route path="/community/grid/announcement" element={isLoggedIn ? <CommunityList /> : <SigninPage />} />
        <Route path="/community/search" element={isLoggedIn ? <CommunitySearch /> : <SigninPage />} />
        <Route path="/community/searchresult" element={isLoggedIn ? <CommunitySearchResult /> : <SigninPage />} />
        <Route path="/diet" element={isLoggedIn ? <FoodPage /> : <SigninPage />} />
        <Route path="/food" element={isLoggedIn ? <FoodPage /> : <SigninPage />} />
        <Route path="/food" element={isLoggedIn ? <FoodPage /> : <SigninPage />} />
        <Route path="/food/add" element={isLoggedIn ? <FoodAddPage /> : <SigninPage />} /> {/* 추가된 경로 */}
        <Route path="/market" element={isLoggedIn ? <MarketPage /> : <SigninPage />} />
        <Route path="/market/detail/:id" element={isLoggedIn ? <MarketDetail /> : <SigninPage />} />
        <Route path="/market/write" element={isLoggedIn ? <MarketPost /> : <SigninPage />} />
        <Route path="/market/chat/:id" element={isLoggedIn ? <MarketChatPage /> : <SigninPage />} />
        <Route path="/market/search" element={isLoggedIn ? <MarketSearch /> : <SigninPage />} />
        <Route path="/market/searchresult" element={isLoggedIn ? <MarketSearchResult /> : <SigninPage />} />
        <Route path="/admin" element={isLoggedIn ? <AdministratorPage /> : <SigninPage />} />
        <Route path="/admin/noticewrite" element={isLoggedIn ? <NoticeWrite /> : <SigninPage />} />
        <Route path="/admin/trainerauth" element={isLoggedIn ? <TrainerAuth /> : <SigninPage />} />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

