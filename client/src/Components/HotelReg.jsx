import React from "react";
import { assets, cities } from "../assets/assets";
import { useUserDetails } from "../store/userStore";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from 'react-toastify';
  
const HotelReg = () => {
  const { setshowHotelReg,setisOwner } = useUserDetails();
  const {user}=useUser();
  const[hotelDetails,setHotelDetails]=React.useState({
   
    name:"",
    contact:"",
    address:"",
    city:"",
    userId: user.id
  });
  const { mutate, isPending} = useMutation({
    mutationFn: async ({ hotel }) => {
   
      const response = await api.post(`/hotels`,hotel );
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error fetching user");
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Hotel Registered Successfully",{position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,});
        setshowHotelReg(false)
    setisOwner(true);
    },
    

  });
  const handleSubmit=(e)=>{
    e.preventDefault();
    mutate({hotel:hotelDetails});
  }
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
      <form  className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
        <img
          src={assets.regImage}
          alt=""
          className="w-1/2 rounded-xl hidden md:block"
        />
        <div className=" relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt=""
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={() => setshowHotelReg(false)}
          />
          <p className="text-2-2xl font-semibold mt-6">Register your Hotel</p>

          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              {" "}
              Hotel Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Type here"
              onChange={(e)=>setHotelDetails({...hotelDetails,name:e.target.value})}
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              {" "}
              Phone
            </label>
            <input
              type="text"
              id="contact"
              onChange={(e)=>setHotelDetails({...hotelDetails,contact:e.target.value})}
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              {" "}
              Address
            </label>
            <input
              type="text"
              id="address"
              onChange={(e)=>setHotelDetails({...hotelDetails,address:e.target.value})}
              placeholder="Type here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            />
          </div>
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              {" "}
              City
            </label>
            <select
              id="city"
              className="border border-gray-200 rounded w-full px-3py-2.5 mt-1 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}
                 onChange={(e)=>setHotelDetails({...hotelDetails,city:e.target.value})}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSubmit} className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            Register
          </button>
          <ToastContainer position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce} />
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
