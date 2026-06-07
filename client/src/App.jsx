import { BrowserRouter, Routes, Route } from "react-router-dom";

import { BookingProvider } from "./context/BookingContext";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Workshops from "./pages/Workshops";
import Events from "./pages/Events";
import ItemDetails from "./pages/ItemDetails";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";

function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/events" element={<Events />} />
            <Route path="/items/:type/:id" element={<ItemDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;