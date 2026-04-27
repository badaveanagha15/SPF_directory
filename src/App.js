import './App.css';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadsPage from './pages/LeadsPage';
import DealsPage from './pages/DealsPage';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadsPage/>} />
        <Route path="/deals" element={<DealsPage/>} />
        <Route path="/tasks" element={<TasksPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
