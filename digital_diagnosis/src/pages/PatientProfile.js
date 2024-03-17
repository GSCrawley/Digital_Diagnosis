// Patient Profile page, including personal information, medical history, and appointment history. The patient can also edit their profile information.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function PatientProfile() {
    const [userData, setUserData] = useState({
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
            const {  user_image, first_name, last_name, DOB ,email, location } = response.data;
            setUserData({ profilePicUrl: user_image, firstName: first_name, lastName: last_name, DOB: DOB, email: email, location: location });
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

  const defaultProfilePic = 'St_Psychonaut.jpg';
  return (
    <div style={styles.mainContainer}>
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
  mainContainer: {
    width: '80%',
    height: '90vh',
    margin: '0 auto', // Centers the container
    top: '10vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Creates the shadow effect for 3-D raised look
    transform: 'translateY(-50px)', // Raises the platform up slightly
    backgroundColor: 'offwhite', // Background color for the container (change as needed)
    borderRadius: '10px', // Optional: rounds the corners for a polished look
    border: '1px solid #ddd', // Optional: creates a border around the container
    overflow: 'hidden', // Ensures the content doesn't spill out of the container's rounded corners
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
    padding: '1rem', // Adjust padding as needed
    position: 'relative', // Needed for absolute positioning of children if required
    zIndex: 10, // Ensures the container is above any background elements
  },
  profileContainer: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    border: '1px solid #ddd',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'left',
    backgroundColor: 'lightyellow',
    height: '30vh',
    // textAlign: 'center',
  },
  profilePic: {
    width: '80px',
    height: '80px',
    borderRadius: '75px',
    objectFit: 'cover',
    padding: '20px'
  },
  profileInfo: {
    color: '#555'
    // marginLeft: '20px',
  },
  name: {
    // margin: '20px',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#555',
  },
  info: {
    fontSize: '18px',
    // margin: '5px 0',
    color: '#555',
  },
  button: {
    backgroundColor: '#4d87bf',
    padding: '10px',
    margin: '10px ',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};