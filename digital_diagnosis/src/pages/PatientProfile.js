// Patient Profile page, including personal information, medical history, and appointment history. The patient can also edit their profile information.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function PatientProfile() {
    const [userData, setUserData] = useState({
        firstName: 'Gideon',
        lastName: 'Crawley',
        DOB: 'August 15th, 1973',
        profilePicUrl: {defaultProfilePic},
        email: '',
        location: ''
      });
    const locationState = useLocation().state;
    const token = locationState?.token;
    const url = locationState?.url;

    useEffect(() => {
        const fetchProtectedContent = async () => {
        if (token && url) {
            try {
            const response = await axios.get(`${url}/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { first_name, last_name, DOB, user_image, email, location } = response.data;
            setUserData({ firstName: first_name, lastName: last_name, DOB, profilePicUrl: user_image, email, location });
            } catch (error) {
            console.error('Error fetching profile:', error);
            }
        }
    };

    fetchProtectedContent();
  }, [token, url]);

  const handleLogout = async () => {
    try {
      await axios.post(`${url}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Redirect to login or perform logout actions
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const defaultProfilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        <img
          src={userData.profilePicUrl || defaultProfilePic}
          style={styles.profilePic}
          alt="Profile"
        />
        <div style={styles.profileInfo}>
          <h1 style={styles.name}>{userData.firstName} {userData.lastName}</h1>
          <p style={styles.info}>DOB: {userData.DOB}</p>
          <p style={styles.info}>Email: {userData.email}</p>
          <p style={styles.info}>Location: {userData.location}</p>
        </div>
      </div>
      {/* <Link to="/symptom" state={{ token: token, url: url }}>
        <button style={styles.button}>Symptom Input Form</button>
      </Link> */}
      <button style={styles.button} onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default PatientProfile;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    minHeight: '100vh',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profilePic: {
    width: '150px',
    height: '150px',
    borderRadius: '75px',
    objectFit: 'cover',
  },
  profileInfo: {
    marginLeft: '20px',
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: '18px',
    margin: '5px 0',
    color: '#555',
  },
  button: {
    backgroundColor: '#4d87bf',
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};