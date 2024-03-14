// Account registration form for patients. Will include login info, personal info; Account profile page will have its own editing capability. this form is only for creating the initial account

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import patientUrl from './Splash';

function PatientRegistrationForm({ onClose }) {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [DOBInput, setDOBInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [image, setImage] = useState(null);
  let url = patientUrl;
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('first_name', firstNameInput);
    formData.append('last_name', lastNameInput);
    formData.append('username', usernameInput);
    formData.append('password', passwordInput);
    formData.append('email', emailInput);
    formData.append('DOB', DOBInput);
    formData.append('location', locationInput);
    if (image) {
      formData.append('user_image', image);
    }

    try {
      const response = await axios.post(`${url}/registration`,  formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // After successful registration, you might want to redirect or close modal
      navigate('/login') 
      // { state: { token: response.data.access_token }});
      
      onClose();
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div style={styles.modalBackground}>
      <div style={styles.modal}>
        <h1 style={styles.title}>Patient Registration</h1>

        <form onSubmit={handleRegistration} style={styles.form}>
            <input
                style={styles.input}
                placeholder="First Name"
                value={firstNameInput}
                type="text"
                onChange={(e) => setFirstNameInput(e.target.value)}
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Last Name"
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                securetextentry="true"
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="DOB"
                value={DOBInput}
                onChange={(e) => setDOBInput(e.target.value)}
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                style={styles.input}
                placeholder="Location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                autoCapitalize="none"
                autoCorrect="false"
            />
            <input
                type="file"
                onChange={handleImageChange}
                style={styles.input}
            />
        <button onClick={handleRegistration} style={styles.button}>
          Register
        </button>
        </form>

        <button onClick={onClose} style={styles.closeButton}>Close</button>
        </div>
    </div>
  );
}

export default PatientRegistrationForm;

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
