import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import EasterEgg from './pages/EasterEgg';
import Timeline from './pages/Timeline';
import HUD from './pages/HUD';
import Feedback from './pages/Feedback';

import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/easter-egg" element={<EasterEgg />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/hud" element={<HUD />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
    </LanguageProvider>
  );
}
