import './bootstrap.min.css';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import './App.css';
import GalleryPage from './pages/HomePage/GalleryPage';
import ContactPage from './pages/HomePage/ContactPage';

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/gallery" element={<GalleryPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;
