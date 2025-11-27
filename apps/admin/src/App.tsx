import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import AuthenticatedRoutes from "./guard/AuthenticatedRoutes";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import Events from "./pages/Events";
import EventMainContent from "./components/events/EventMainContent";
import AddEventWrapper from "./components/events/AddEventWrapper";
import Staff from "./pages/Staff";
import StaffMainContent from "./components/Staff/StaffMainContent";
import AddStaffWrapper from "./components/Staff/AddStaffWrapper";
import LadiesNight from "./components/LadiesNight/LadiesNight";
import SpinningWheel from "./components/SpinningWheel/SpinningWheel";
import NotFound from "./components/NotFound/NotFound";
import EditAccountWrapper from "./components/EditAccount/EditAccountWrapper";
import UsersTable from "./components/Users/Users";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Toaster />

          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<AuthenticatedRoutes />}>
              <Route path="/" element={<Home />}>
                <Route index element={<Navigate to="/events" />} />
                {/* <Route path="dashboard" element={<Dashboard />} /> */}

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

                <Route path="ladies-night" element={<LadiesNight />} />
                <Route path="spinning-wheel" element={<SpinningWheel />} />
                <Route path="account" element={<EditAccountWrapper />} />
                <Route path="users" element={<UsersTable />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
