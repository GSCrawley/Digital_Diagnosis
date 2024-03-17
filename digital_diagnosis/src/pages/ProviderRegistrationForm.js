// Account registration form for patients. Will include login info, personal info; Account profile page will have its own editing capability. this form is only for creating the initial account

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProviderRegistrationForm({ onClose, url }) {
  const [nameInput, setNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    formData.append('name', nameInput);
    formData.append('password', passwordInput);
    formData.append('email', emailInput);
    formData.append('specialty', specialtyInput);
    // formData.append('location', locationInput);
    try {
      const response = await axios.post(`${url}/provider-registration`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      // After successful registration, you might want to redirect or close modal
      navigate('/provider-login', { state: { url: url }});
      onClose();
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
    }
  };


  return (
    <div style={styles.modalBackground}>
      <div style={styles.modal}>
        <h2>Care Provider Registration</h2>
        <form onSubmit={handleRegistration} style={styles.form}>
            <input
                style={styles.input}
                placeholder="Name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
            />
            <input
                style={styles.input}
                placeholder="Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                // securetextentry="true"
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                // securetextentry="true"
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Specialty"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                // securetextentry="true"
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                //   secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect="false"
            />
           
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
}

export default ProviderRegistrationForm;

const styles = {
  modalBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
},
modal: {
    background: '#fff',
    padding: 20,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
},
form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
},
button: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    cursor: 'pointer',
},
closeButton: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    cursor: 'pointer',
},
error: {
    color: 'red',
}
}