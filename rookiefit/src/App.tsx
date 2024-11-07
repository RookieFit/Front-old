import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './layout/header/header';
import LoginPage from './logIn/LoginPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <LoginPage />
        <Routes>
          <Route path="/mypage" element={<></>} />
          <Route path="/calendar" element={<></>} />
          <Route path="/diet" element={<></>} />
          <Route path="/community" element={<></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App
