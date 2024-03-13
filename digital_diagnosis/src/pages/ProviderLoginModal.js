import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordResetModal from './PasswordResetModal';
import ProviderRegistrationForm from './ProviderRegistrationForm'
import providerUrl from './Splash';

const ProviderLoginModal = ({ onClose, url }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showProviderRegistration, setShowProviderRegistration] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${url}/provider-login`, {
        email: email,
        password: password,
      });
      const token = response.data.access_token;      
      navigate('/provider-profile', { state: { token : token}});
      onClose();
    } catch (error) {
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <>
    <div style={styles.modalBackground}>
      <div style={styles.modal}>
        <h2>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
            required
          />
          <div style={styles.links}>
            {/* <a href="#" onClick={() => setShowPasswordReset(true)}>Forgot your password?</a> */}
        <a onClick={() => setShowProviderRegistration(true)}>  Don't have an account? Register here </a>
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>

    {showProviderRegistration && (
        <ProviderRegistrationForm
            url={providerUrl}
            onClose={() => setShowProviderRegistration(false)}
          />
        )}
    {showPasswordReset && (
        <PasswordResetModal 
          url={url}
          onClose={() => setShowPasswordReset(false)}
        />
      )}
    </>
  )
    }
export default ProviderLoginModal;

const styles = {
  modalBackground: {
    
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    border: '1px solid #ddd',
    borderRadius: '10px',
    background: '#fff',
    padding: 20,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1001,
  },
  input: {
    margin: '5px -10px',
    height: 30,
    width: '100%',
    paddingLeft: '10px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    cursor: 'pointer',
  },
  closeButton: {
    marginTop: '10px',
  },
  error: {
    color: 'red',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '14px',
    margin: '10px 0',
  }
};


