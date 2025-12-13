import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast ,Bounce} from "react-toastify";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import axios from "axios";
import api from "../config/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import Starrating from "../Components/Starrating";
import { useNavigate } from "react-router-dom";
import React from "react";
import YouTube from "../Components/skeleton";
const Roomdetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [available, setAvailable] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
 const userId = user.id;
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featuredDestinations"],
    queryFn: async () => {
      const response = await api.get("/rooms");
      console.log(response.data);
      return response.data;
    },
  });
 
const checkavailability = useMutation({
    mutationKey: ["checkAvailability"],
    mutationFn: async (Details) => {
      const response = await api.post(`/bookings/check-availability`, Details);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error fetching user");
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: (data) => {
      if (data.message === "Room is available for the selected dates.") {
        toast.success("Room is available for the selected dates.");
        setAvailable(true);
      } else {
        toast.info("Room is not available for the selected dates.");
        setAvailable(false);
      }
    },
  });
  const book = useMutation({
    mutationKey: ["bookRoom"],
    mutationFn: async (details) => {
      const response = await api.post(`/bookings/book`, details);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error fetching user");
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: (data) => {
      navigate("/my-bookings");
    },
  }




);
if (isLoading) {
  return<YouTube/>;
};

if (isError) {
  return <div>{error.message}|| something went wrong</div>;
};
if (data) {
  const roomData = data.rooms.find((room) => room._id === id);
  if (roomData && !room) {
    setRoom(roomData);
    setMainImage(roomData.images[0]);
  };
};

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter pt-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <Starrating />
          <p className="ml-2">200+ reviews</p>
        </div>
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="" />
          <span>{room.hotel.address}</span>
        </div>
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt=""
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className=" grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt=""
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && "outline-3 outline-orange-500"}`}
                />
              ))}
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className=" flex flex-col">
            <h1 className="text-xl md:text-4xl font-playfair">
              Experience luxury like never before{" "}
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {
                Object.entries(room.ammenities[0])
                .filter(([, v]) => v)
                .map(([k]) => k)
                .map((item, index) => (
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                  key={index}
                >
                  <img src={facilityIcons[item]} alt="" className="w-5 h-5" />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>
        <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                {" "}
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                min={new Date().toISOString().split("T")[0]}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                placeholder="Check-In"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                {" "}
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                placeholder="Check-Out"
                min={checkInDate}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                {" "}
                Guests
              </label>
              <input
                type="number"
                id="guests"
                placeholder="0"
                onChange={(e) => setGuests(e.target.value)}
                value={guests}
                min={1}
                className=" max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>

          {available ? (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                book.mutate({
                  roomId: id,
                  checkInDate,
                  checkOutDate,
                  numberOfGuests: guests,
                  userId,
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
            >
              {book.isPending ? "Booking..." : "Book Now"}
            </button>
          ) : (
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                checkavailability.mutate({
                  roomId: id,
                  checkInDate,
                  checkOutDate,
                });
              }}
              className="bg-blue-500 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
            >
              {checkavailability.isPending
                ? "Checking..."
                : "check Availability"}
            </button>
          )}
        </form>
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={spec.icon} className="w-6.5" alt="" />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit sed
            vel porro natus iusto recusandae esse repellat necessitatibus animi
            totam temporibus, exercitationem ratione error consequatur quo odio
            deserunt aut autem. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Quaerat fugiat asperiores ea illum maiores. Amet,
            aut vero! Sunt in ut sint deleniti ipsum, minima commodi rerum iusto
            eveniet, odio exercitationem!
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt="Host"
              className="h-14 w-14 md:h-18 md:w-18 rounded-full"
            />
            <div>
              <p className="text-lg md:text-xl">Hosted By {room.hotel.name}</p>
              <div className="flex item-center mt-1">
                <Starrating />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-blue-500 hover:bg-blue-700 transition-all cursor-pointer">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default Roomdetails;
