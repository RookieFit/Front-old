import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './layout/header/header';
import CalenderPage from './calendar/calenderPage';
import LoginPage from './logIn/LoginPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <LoginPage />
        <Routes>
          <Route path="/login" element={<></>} />
          <Route path="/signup" element={<></>} />
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
