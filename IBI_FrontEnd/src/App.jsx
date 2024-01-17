import HeaderComponent from './components/HeaderComponent';
import './bootstrap.min.css';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
  return (
    <body>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </body>
  );
}

export default App;
