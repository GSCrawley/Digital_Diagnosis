// import React, { useState } from 'react';
// import axios from 'axios';

// const PasswordResetModal = ({ url, onClose }) => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handlePasswordResetRequest = async (event) => {
//     event.preventDefault();
//     try {
//       // Replace with your actual backend endpoint for password reset requests
//       const response = await axios.post(`${url}/request-password-reset`, { email });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Error sending password reset email. Please try again later.');
//     }
//   };

//   return (
//     <div style={styles.modalBackground}>
//       <div style={styles.modal}>
//         <h2>Reset Password</h2>
//         <form onSubmit={handlePasswordResetRequest}>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             style={styles.input}
//             required
//           />
//           <button type="submit" style={styles.button}>Send Reset Email</button>
//         </form>
//         {message && <p>{message}</p>}
//         <button onClick={onClose} style={styles.closeButton}>Close</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   // Add your styles here, similar to your LoginModal styles
// };

// export default PasswordResetModal;
