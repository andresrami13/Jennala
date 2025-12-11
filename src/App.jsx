import './App.css'
import Navbar from './Components/Navbar.jsx'
import Home from './Pages/home.jsx';
import Shopping_Cart from './Pages/Shopping_Cart.jsx';
import Footer from './Components/Footer.jsx'
import AuthProvider from './Context/AuthProvider.jsx';
import ProviderCart from './Context/ContextCart.jsx'; 
import LoginForm from './Components/LoginForm.jsx';
import Admin from './Pages/Admin.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom'  

function App() {

  return (
    <AuthProvider>
       <ProviderCart>
          <BrowserRouter>
              <Navbar /> 
                    <div className="main-content-wrapper">
                      <Routes>

                          <Route path="/Login" element={<LoginForm />} />
                          <Route path="/" element={<Home />} />
                          <Route path="/Shopping_Cart" element={<Shopping_Cart />} />
                          <Route path="*" element={<h2>404: Página no encontrada</h2>} /> 
                          <Route path="/Admin" element={
                                <ProtectedRoute>
                                  <Admin />
                                </ProtectedRoute>
                              } 
                          />

                      </Routes>
                    </div>    
              <Footer/>          
          </BrowserRouter>
        </ProviderCart>
  </AuthProvider>
    
  )
}

export default App


