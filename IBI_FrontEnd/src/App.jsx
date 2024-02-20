import './bootstrap.min.css';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import './App.css';
import GalleryPage from './pages/HomePage/GalleryPage';
import BidRequestForm from './components/BidRequestForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/gallery" element={<GalleryPage />}></Route>
          <Route path="/contact" element={<BidRequestForm />}></Route>
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </>
  );
}

export default App;
