import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
