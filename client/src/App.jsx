import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { useLocation, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import AllRooms from "./Pages/AllRooms";
import Roomdetails from "./Pages/Roomdetails";
import MyBookings from "./Pages/MyBookings";
import HotelReg from "./Components/HotelReg";
import Layout from "./Pages/HotelOwner/Layout";
import Dashboard from "./Pages/HotelOwner/Dashboard";
import ListRoom from "./Pages/HotelOwner/ListRoom";
import AddRoom from "./Pages/HotelOwner/AddRoom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { showHotelReg } from "./store/userStore";

function App() {
  const queryClient = new QueryClient();
  const IsOwner = useLocation().pathname.includes("owner");
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {!IsOwner && <Navbar />}
        {showHotelReg && <HotelReg />}
        <div className="min-h-[70vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<AllRooms />} />
            <Route path="/rooms/:id" element={<Roomdetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/owner" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="add-room" element={<AddRoom />} />
              <Route path="list-room" element={<ListRoom />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>{" "}
    </QueryClientProvider>
  );
}

export default App;
