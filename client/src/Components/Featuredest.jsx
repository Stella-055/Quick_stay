import React from "react";
import Hotelcard from "./Hotelcard";

import Title from "./Title";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useQuery } from "@tanstack/react-query";
const Featuredest = () => {
  const navigate = useNavigate();

const { data, isLoading, isError ,error} = useQuery({
    queryKey: ['featuredDestinations'],
    queryFn: async () => {
      const response = await api.get('/rooms');
      return response.data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}|| something went wrong</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24  bg-slate-50 pb-10 pt-20">
      <Title
        title="Featured Destinations"
        subtitle="Explore the best hotels in your favorite destinations and discover exciting homes and properties around the world "
      />
      <div className="flex  flex-wrap items-center justify-center gap-6 mt-20 ">
        {data.slice(0, 4).map((room, index) => (
          <Hotelcard room={room} key={room._id} index={index} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/rooms");
          scrollTo(0, 0);
        }}
        className="my-16 px-4  pt-2 text-sm font-medium border-gray-300 rounded bg-white hover:bg-gray-50 transition-al  cursor-pointer"
      >
        {" "}
        View All Destinations
      </button>
    </div>
  );
};

export default Featuredest;
