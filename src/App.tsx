import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import SalaryInsightsPage from './components/SalaryInsightsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/insights" element={<SalaryInsightsPage />} />
          </Routes>
        </ProtectedRoute>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;