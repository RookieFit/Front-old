import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './layout/header/header';

function App() {
  const menuItems = [
    { label: "캘린더", path: "/calendar" },
    { label: "식단", path: "/diet" },
    { label: "커뮤니티", path: "/community" }
  ];

  return (
    <BrowserRouter>
      <div>
        <Header menuItems={menuItems} />
        <Routes>
          <Route path="/mypage" element={<div>My Page</div>} />
          <Route path="/calendar" element={<div>calendar Page</div>} />
          <Route path="/diet" element={<div>diet Page</div>} />
          <Route path="/community" element={<div>community Page</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App
