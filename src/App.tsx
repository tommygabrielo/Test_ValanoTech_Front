import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import { AvisProvider } from './context/AvisContext';

function App() {
  return (
    <AuthProvider>
      <AvisProvider>
        <ProductProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <Admin />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </ProductProvider>
      </AvisProvider>
    </AuthProvider>
  );
}

export default App;
