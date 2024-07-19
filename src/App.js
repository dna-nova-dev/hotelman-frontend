import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SalesPoint from './views/SalesPoint';
import CreateView from './views/SalesPoint/create';
import Login from './views/Login';
import Signup from './views/Signup';
import Presence from './views/Presence';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/salespoint" element={<SalesPoint />} />
        <Route path='/presence' element={<Presence />} />
        <Route path="/create" element={<CreateView />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </Router> 
      
  )
}

export default App;
