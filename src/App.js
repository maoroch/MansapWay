import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AuthPage from './pages/auth';
import Navbar from './components/Navbar';
import ProfileForm from './pages/ProfileForm'
import CareerRecomendations from './pages/CareerRecomendations'
import Footer from './components/Footer'
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Контент будет растягиваться */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfileForm />} />
            <Route path="/feed" element={<CareerRecomendations />} />
            <Route path="/Users" element={<Users />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}


export default App;
