import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthenticatedRoutes from "./guard/AuthenticatedRoutes";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { LoginForm } from "./components/Login/login-form";
import Login from "./components/Login/Login";
import { Sidebar } from "./components/SideBar/sidebar";


const queryClient = new QueryClient();


function App() {


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
           
            
            <Routes>
              <Route path="/login" element={<Login />} />
          

              <Route element={<AuthenticatedRoutes />}>
                <Route path="/" element={<Home />} >
                
                
                
              <Route path="*" element={<NotFound />} />
                
                </Route>

              </Route>





            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
