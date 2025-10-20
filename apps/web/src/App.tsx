import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import About from "./components/About/About";
import Gallery from "./components/Gallery/Gallery";
import Events from "./components/Events/Events";
import ContactUs from "./components/ContactUs/ContactUs";
import ScrollToTop from "./utils/ScrollToTop";
import NavBar619 from "./components/TopBar/Nav";
import { ResetPassword } from "./components/ResetPassword/reset-password";
import Reservation from "./components/Reservation/Reservation";
import { MenuCarousel } from "./components/Menu/MenuCarousel";

function App() {
  return (
    <div className="flex flex-col min-h-screen  ">
      <Router>
        <ScrollToTop />

        <NavBar619 />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Outlet />}>
            <Route index element={<Menu />} />
            <Route path="food" element={<MenuCarousel menuType="Food" />} />
            <Route path="cocktails" element={<MenuCarousel menuType="Cocktails" />} />
            <Route path="hookah" element={<MenuCarousel menuType="Hookah" />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/reservation" element={<Reservation />} />

          <Route path="reset-password/" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
