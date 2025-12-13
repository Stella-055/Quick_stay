import React from "react";
import { assets, facilityIcons } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import Starrating from "../Components/Starrating";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

import YouTube from "../Components/skeleton";
const Checkbox = ({ label, selected, onChange = () => {} }) => {
  return (
    <label className=" flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onchange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const Radiobutton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className=" flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOptions"
        checked={selected}
        onChange={(e) => onchange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setopenFilters] = useState(false);
  const { city } = useSearchParams();
  const roomTypes = [
    "Single Room",
    "Double Room",
    "Luxury Room",
    "Family Suite",
  ];
  const priceranges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to3000",
  ];
  const sortOptions = ["Price low to high", "high to low", "Newest First"];
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featuredDestinations"],
    queryFn: async () => {
      const response = await api.get("/rooms");
      console.log(response.data);
      return response.data;

    },
  });
  
  const [rooms, setrooms] = React.useState(data?.rooms);
  if (city?.get("city")) {
    React.useEffect(() => {
      const filteredRoomsByCity = data.filter(
        (room) =>
          room.hotel.city.toLowerCase() === city.get("city").toLowerCase(),
      );
      setrooms(filteredRoomsByCity);
    }, [city]);
  }
  function filterRoomType(type) {
    const filteredRooms = rooms.filter((room) => room.roomType === type);
    setrooms(filteredRooms);
  }
  const filterPriceRange = (range) => {
    const [min, max] = range.split(" to ").map(Number);
    const filteredRooms = rooms.filter(
      (room) => room.pricePerNight >= min && room.pricePerNight <= max,
    );
    setrooms(filteredRooms);
  };
  const sortRooms = (option) => {
    let sortedRooms = [...rooms];
    if (option === "Price low to high") {
      sortedRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (option === "high to low") {
      sortedRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (option === "Newest First") {
      sortedRooms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setrooms(sortedRooms);
  };
  if (isLoading) {
    return <YouTube/>;
  }

  if (isError) {
    return <div>{error.message}|| something went wrong</div>;
  }
  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px=4 md:px-16 lg:px-24">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories
          </p>
        </div>

        {rooms?.map((room) => (
          <div className="flex flex-col md:flex-row items-start py-10 gap-6 border-b  border-gray-300 last:pb-30 last:border-0">
            <img
              src={room.images[0]}
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              alt=""
              title="View room details "
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                className="text-gray-800 text-3xl font-playfair cursor-pointer"
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <Starrating />
                <p className="ml-2">200+reviews</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="" />
                <span>{room.hotel.address}</span>
              </div>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {Object.entries(room.ammenities[0])
  .filter(([_, value]) => value === true)
  .map(([key]) => key).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                  >
                    <img src={facilityIcons[item]} alt="" className="w-5 h-5" />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight}/Night
              </p>
            </div>
          </div>
        ))}
      </div>
      {/*Filters*/}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-5  min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor- pointer">
            <span
              onClick={() => setopenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>
        <div
          className={`${openFilters ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className=" font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <Checkbox
                key={index}
                label={room}
                onchange={() => filterRoomType(room)}
              />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className=" font-medium text-gray-800 pb-2">Price Range</p>
            {priceranges.map((range, index) => (
              <Checkbox
                key={index}
                label={`$ ${range}`}
                onChange={() => filterPriceRange(range)}
              />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className=" font-medium text-gray-800 pb-2">sort By</p>
            {sortOptions.map((option, index) => (
              <Radiobutton
                key={index}
                label={option}
                onChange={() => sortRooms(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
