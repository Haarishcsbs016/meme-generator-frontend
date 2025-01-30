import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MemeGenerator from './components/MemeGenerator';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#f5f7fa'
      }}>
        <Header />
        <main style={{ 
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><MemeGenerator /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;