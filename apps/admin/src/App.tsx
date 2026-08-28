import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "sonner";
import EditAccountWrapper from "./components/EditAccount/EditAccountWrapper";
import AddEventWrapper from "./components/events/AddEventWrapper";
import EventMainContent from "./components/events/EventMainContent";
import LadiesNight from "./components/LadiesNight/LadiesNight";
import Login from "./components/Login/Login";
import MembershipTable from "./components/membership/membership-table";
import NotFound from "./components/NotFound/NotFound";
import SpinningWheel from "./components/SpinningWheel/SpinningWheel";
import AddStaffWrapper from "./components/Staff/AddStaffWrapper";
import StaffMainContent from "./components/Staff/StaffMainContent";
import UsersTable from "./components/Users/Users";
import { AuthProvider } from "./context/AuthContext";
import AuthenticatedRoutes from "./guard/AuthenticatedRoutes";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Membership from "./pages/Memebership";
import Staff from "./pages/Staff";
import EditMembership from "./components/membership/edit-membership";

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
                <Route path="membership" element={<Membership />}>
                  <Route index element={<MembershipTable />} />
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
