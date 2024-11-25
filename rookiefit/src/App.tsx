import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/header/header';
import CalenderPage from './calendar/calenderPage';
import SigninPage from './signIn/signInPage';
import SignUpPage from './signUp/signUpPage';
import FindId from './findId/findId';
import PasswordReset from './passwordReset/passwordReset';
import MyPage from './mypage/myPage';
import MyPageEdit from './mypage/myPageEdit';
import CommunityList from './community/communityList/communityList';
import CommunityDetail from './community/communityDetail/communityDetail';
import CommunityWrite from './community/communityWrite/communityWrite';
import FindPassword from './findPassword/findPassword';
import FindIdResult from './findIdResult/findIdResult';
import FoodPage from './food/foodPage';
import SeenPage from './mypage/seenPage/seenPage';
import SeedPostGridProps from './mypage/seenPage/seenFeed/senFeedcommunityComponents/seedPostGridProps';
import CommunitySearch from './community/communityComponents/communitySearch'; // CommunitySearch import 추가

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
        <Route path="/" element={<SeedPostGridProps posts={Comment.postId} />} />
          <Route path="/seenPage" element={<SeenPage />} />
          <Route path="/mypageedit" element={<MyPageEdit />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findidresult" element={<FindIdResult />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/calendar" element={<CalenderPage />} />
          <Route path="/calendar/write" element={<CalenderPage />} />
          <Route path="/calendar/detail" element={<CalenderPage />} />
          <Route path="/community" element={<CommunityList />} />
          <Route path="/community/bodyprofile" element={<CommunityList />} />
          <Route path="/community/concern" element={<CommunityList />} />
          <Route path="/community/information" element={<CommunityList />} />
          <Route path="/community/friendship" element={<CommunityList />} />
          <Route path="/community/announcement" element={<CommunityList />} /> {/* 공지 경로 추가 */}
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/detail/:id" element={<CommunityDetail />} />
          <Route path="/community/grid" element={<CommunityList />} />
          <Route path="/community/grid/bodyprofile" element={<CommunityList />} />
          <Route path="/community/grid/concern" element={<CommunityList />} />
          <Route path="/community/grid/information" element={<CommunityList />} />
          <Route path="/community/grid/friendship" element={<CommunityList />} />
          <Route path="/community/grid/announcement" element={<CommunityList />} />
          <Route path="/community/search" element={<CommunitySearch />} /> {/* CommunitySearch 경로 추가 */}
          <Route path="/diet" element={<FoodPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
