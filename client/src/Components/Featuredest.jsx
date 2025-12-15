import React from "react";
import Hotelcard from "./Hotelcard";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import YouTube from "./skeleton";
import Alert from '@mui/material/Alert';

const Featuredest = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featuredDestinations"],
    queryFn: async () => {
      const token =  await getToken();
      const response = await api.get("/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      });
   
      return response.data;
    },
  });
  if (isLoading) {
    return   <YouTube/>
  
  }

  if (isError) {
    return <div className="flex  items-center justify-center  w-full h-40">
     <Alert severity="error">Something went wrong while fetching the hotels.</Alert>
    </div>
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-16 lg:px-24  bg-slate-50 pb-10 pt-20">
      <Title
        title="Featured Destinations"
        subtitle="Explore the best hotels in your favorite destinations and discover exciting homes and properties around the world "
      />
      <div className="flex  flex-wrap items-center justify-center gap-6 mt-20 ">
   
        {data &&
      
          data.rooms.slice(0, 4).map((hotel) => (
            <Hotelcard key={hotel._id} room={hotel} />
          ))}



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
