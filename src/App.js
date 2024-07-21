import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SalesPoint from './views/SalesPoint';
import CreateView from './views/SalesPoint/create';
import Login from './views/Login';
import Signup from './views/Signup';
import Presence from './views/Presence';
import NotFoundPage from './views/NotFound';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/salespoint" element={<SalesPoint />} />
        <Route path='/presence' element={<Presence />} />
        <Route path="/create" element={<CreateView />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router> 
      
  )
}

export default App;
