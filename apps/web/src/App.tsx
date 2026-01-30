import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import About from "./components/About/About";
import Events from "./components/Events/Events";
import ContactUs from "./components/ContactUs/ContactUs";
import ScrollToTop from "./utils/ScrollToTop";
import NavBar619 from "./components/TopBar/Nav";
import { ResetPassword } from "./components/ResetPassword/reset-password";
import Reservation from "./components/Reservation/Reservation";
import { MenuCarousel } from "./components/Menu/MenuCarousel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./components/NotFound/NotFound";
import { Toaster } from "sonner";
import CocktailSwiper from "./components/Menu/CocktailSwiper";
import SocialsFloatingButton from "./components/SocialsBubble/SocialsFloatingButton";
import FoodV2 from "./components/Menu/food/foodV2/FoodV2";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen  ">
        <Router>
          <ScrollToTop />
          <Toaster />
          <SocialsFloatingButton />
          <NavBar619 />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Outlet />}>
              <Route index element={<Menu />} />
              <Route path="cocktails" element={<CocktailSwiper />} />
              <Route path="cocktails/all" element={<MenuCarousel menuType="Cocktails" />} />
              <Route path="food" element={<FoodV2 />} />
              <Route path="hookah" element={<MenuCarousel menuType="Hookah" />} />
            </Route>
            <Route path="/about" element={<About />} />
            {/* <Route path="/gallery" element={<Gallery />} /> */}
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/reservation" element={<Reservation />} />

            <Route path="reset-password/" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
