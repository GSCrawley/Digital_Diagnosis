import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Splash from './pages/Splash';
import LoginModal from './pages/LoginModal';
import ProviderLoginModal from './pages/ProviderLoginModal';
import PatientRegistrationForm from './pages/PatientRegistrationForm';
import ProviderRegistrationForm from './pages/ProviderRegistrationForm';
import PatientProfile from './pages/PatientProfile';
import ProviderProfile from './pages/ProviderProfile';
// import PatientProfileScreen from './pages/ProviderViewPatientProfile';

// import SymptomFormScreen from './pages/SymptomForm';
// import KeySymptomsScreen from './pages/KeySymptoms';
// import CareProviderSymptomFormScreen from './pages/CareProviderSymptomForm';
// import DiagnosisScreen from './pages/Diagnosis';
// import ProviderDiagnosisScreen from './pages/ProviderDiagnosis';
// import DiseaseStatsScreen from './pages/DiseaseStats';
// import RiskFactorInputScreen from './pages/RiskFactorsInput';
// import RiskFactorsScreen from './pages/RiskFactors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/provider-login" element={<ProviderLoginModal/>} />
        <Route path="/registration" element={<PatientRegistrationForm />} />
        <Route path="/provider-registration" element={<ProviderRegistrationForm/>} />
        <Route path="/profile" element={<PatientProfile/>} />
        <Route path="/provider-profile" element={<ProviderProfile/>} />
        {/* <Route path="/patient-profile" element={<ProviderViewPatientProfile/>} /> */} */}
        {/* <Route path="/symptom" element={<SymptomFormScreen/>} />
        <Route path="/care-provider-symptoms" element={<CareProviderSymptomFormScreen/>} />
        <Route path="/diagnosis" element={<DiagnosisScreen/>} />
        <Route path="/provider-diagnosis" element={<ProviderDiagnosisScreen/>} />
        <Route path="/disease-stats" element={<DiseaseStatsScreen/>} />
        <Route path="/risk-factors-input" element={<RiskFactorInputScreen/>} />
        <Route path="/key-symptoms" element={<KeySymptomsScreen/>} />
        <Route path="/risk-factors" element={<RiskFactorsScreen/>} />
        Add other routes as needed */} 
      </Routes>
    </Router>
  );
}

export default App;
