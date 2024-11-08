import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './layout/header/header';
import CalenderPage from './calendar/calenderPage';
import LoginPage from './logIn/loginPage';
import SignUpPage from './signup/signUpPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/mypage" element={<></>} />
          <Route path="/calendar" element={<CalenderPage />} />
          <Route path="/diet" element={<></>} />
          <Route path="/community" element={<></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App
