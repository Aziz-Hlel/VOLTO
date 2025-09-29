import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthenticatedRoutes from "./guard/AuthenticatedRoutes";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { LoginForm } from "./components/Login/login-form";
import Login from "./components/Login/Login";
import { Sidebar } from "./components/SideBar/sidebar";
import Events from "./pages/Events";
import EventMainContent from "./components/events/EventMainContent";
import EventAddForm from "./components/events/AddEvent";
import { Toaster } from "sonner";
import AddEventWrapper from "./components/events/AddEventWrapper";
import Staff from "./pages/Staff";
import StaffMainContent from "./components/Staff/StaffMainContent";
import AddStaffWrapper from "./components/Staff/AddStaffWrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Toaster />

            <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<AuthenticatedRoutes />}>
                <Route path="/" element={<Home />}>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />

                  <Route path="events/" element={<Events />}>
                    <Route index element={<EventMainContent />} />
                    <Route path="create" element={<AddEventWrapper />} />
                    <Route path="edit/:eventId" element={<AddEventWrapper />} />
                  </Route>

                  <Route path="staff/" element={<Staff />}>
                    <Route index element={<StaffMainContent />} />
                    <Route path="create" element={<AddStaffWrapper />} />
                    <Route path="edit/:staffId" element={<AddStaffWrapper />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
