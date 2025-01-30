import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ 
      marginBottom: '20px',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <nav>
        <ul style={{ 
          listStyle: 'none', 
          display: 'flex', 
          gap: '20px',
          padding: '0',
          margin: '0'
        }}>
          <li>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
        </ul>
      </nav>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/login" style={buttonStyle}>Login</Link>
        <Link to="/signup" style={{...buttonStyle, backgroundColor: '#4a90e2', color: 'white'}}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  padding: '5px 10px',
  borderRadius: '4px',
};

const buttonStyle = {
  textDecoration: 'none',
  color: '#4a90e2',
  fontWeight: 'bold',
  padding: '8px 16px',
  borderRadius: '8px',
  border: '2px solid #4a90e2',
};

export default Header; 