import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as Lotus } from '../assets/Lotus.svg'; // Ensure this SVG is in your src/assets directory
import logo from '../assets/logo_adobe_express.svg'; // Ensure this logo is in your src/assets directory
import LoginModal from './LoginModal';
import ProviderLoginModal from './ProviderLoginModal';

function Splash()  {
  const [patientUrl, setPatientUrl] = useState('');
  const [providerUrl, setProviderUrl] = useState('');
  const [showPatientLogin, setShowPatientLogin] = useState(false);
  const [showProviderLogin, setShowProviderLogin] = useState(false);
  
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const patientResult = await axios.get('https://cognitive-network-manager-rdwl5upzra-uw.a.run.app/patient_server');
        setPatientUrl(patientResult.data.url) 
        console.log(patientResult.data.url, "hello")
      } catch (error) {
        console.error('Error fetching data from patient server:', error);
      }
      try {
        const providerResult = await axios.get('https://cognitive-network-manager-rdwl5upzra-uw.a.run.app/care_provider_server');
        setProviderUrl(providerResult.data.url);
        console.log((providerResult.data.url, "hello"))
      } catch (error) {
        console.error('Error fetching data from care provider server:', error);
      }
    };
    fetchUrls();
  }, []);

  return (
    <div style={styles.mainContainer}>
            <img src={logo} alt="Digital Diagnosis Logo" style={styles.logo} />

    <div style={styles.container}>
      <Lotus style={styles.lotus} />
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => setShowPatientLogin(true)}>Patient</button>
        <button style={styles.button} onClick={() => setShowProviderLogin(true)}>Provider</button>
      </div>

      {showPatientLogin && (
        <LoginModal 
          url={patientUrl}
          onClose={() => setShowPatientLogin(false)}
        />
      )}

      {showProviderLogin && (
        <ProviderLoginModal 
  url= {providerUrl}
          onClose={() => setShowProviderLogin(false)}
        />
      )}

     
        
     
  
    </div>
    </div>
  );
};

export default Splash;

const styles = {
  mainContainer: {
    width: '80%',
    height: '90vh',
    margin: '0 auto', // Centers the container
    top: '10vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Creates the shadow effect for 3-D raised look
    transform: 'translateY(-50px)', // Raises the platform up slightly
    backgroundColor: 'lightyellow', // Background color for the container (change as needed)
    borderRadius: '10px', // Optional: rounds the corners for a polished look
    border: '1px solid #ddd', // Optional: creates a border around the container
    overflow: 'hidden', // Ensures the content doesn't spill out of the container's rounded corners
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem', // Adjust padding as needed
    position: 'relative', // Needed for absolute positioning of children if required
    zIndex: 10, // Ensures the container is above any background elements
  },
  container: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    border: '1px solid #ddd',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '90vh',
    textAlign: 'center',
  },
  logo: {
    width: '240px',
    height: 'auto',
    justifyContent: 'center',
    // marginTop: '-80px',
    marginBottom: '20px'
  },
  lotus: {
    width: '260px',
    // marginTop: '40px',
    // marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '20%', // Adjust based on actual button container width
    // marginTop: '20px',
  },
  button: {
    padding: '10px 10px',
    margin: '10px 10px',
    border: '2px solid #4CAF50',
    borderRadius: '10px',
    backgroundColor: 'lightyellow', // Green shade for Patient button
    color: '#4CAF50',
    fontSize: '16px',
    cursor: 'pointer',
    outline: 'none',
  },
  buttonProvider: {
    backgroundColor: '#008CBA', // Blue shade for Provider button
  },
  // Responsive design adjustments if necessary
  mediaQuery: { // This is not a valid inline style, it's here just for representation
    '@media (max-width: 600px)': {
      buttonContainer: {
        width: '80%',
        flexDirection: 'column',
      },
      button: {
        width: '100%',
        margin: '10px 0',
      },
    },
  },
};
