import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DecisionSection from './components/DecisionSection';
import AboutSection from './components/AboutSection';
import InstitutesSection from './components/InstitutesSection';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <DecisionSection />
    <AboutSection />
    <InstitutesSection />
    <RegistrationForm />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="font-sans min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
