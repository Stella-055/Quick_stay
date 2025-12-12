import React, { useState } from "react";
import Title from "../../Components/Title";
import { assets } from "../../assets/assets";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast ,Bounce} from "react-toastify";
import axios from "axios";
import { useUser,useAuth } from "@clerk/clerk-react";
import api from "../../config/api";
const AddRoom =   () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  
  const [images, setImages] = useState({
    1: null,
    2: null,

    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    ammenities: {
      "free wifi ": false,
      "free breakfast ": false,
      "Room service ": false,
      "Mountain view ": false,
      "Pool access": false,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["addRoom"],
    mutationFn: async (formData) => {
      const token =  await getToken();
      const response = await api.post(`/rooms`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error fetching user");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Room Added Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.roomType || Object.values(images).some((img) => img === null)) {
      toast.error("Please fill all required fields and upload all images");
      return;
    }
  
    const formData = new FormData();
    formData.append('room', JSON.stringify(inputs)); // Stringify room object
    formData.append('userId', user.id);
  
    // Append each image (use same field name 'images' for array)
    Object.values(images).forEach((img) => {
      if (img) formData.append('images', img);
    });
   
    mutate(formData); // Pass formData instead
  };
  return (
    <>
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
      <form action="" onSubmit={handleSubmit}>
        <Title
          align="left "
          font="outfit"
          title="Add Room"
          subtitle=" Fill in the form carefully with details that are accurate"
        />

        <p className=" text-gray-800 mt-10">Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
          {Object.keys(images).map((key) => (
            <label htmlFor={`roomImage${key}`}>
              <img
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt=""
                className="max-h-13 cursor-pinter opacity-80"
              />
              <input
                type="file"
                accept="image/*"
                id={`roomImage${key}`}
                hidden
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
              />
            </label>
          ))}
        </div>

        <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
          <div className="flex-1 max-w-48">
            <p className="text-gray-800 mt-4">Room Type</p>
            <select
              className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
              value={inputs.roomType}
              onChange={(e) =>
                setInputs({ ...inputs, roomType: e.target.value })
              }
            >
              <option value="">Select room Type</option>
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Luxury Room">Luxury Room</option>
              <option value="Luxury Room">Family Suite</option>
            </select>
          </div>
          <div>
            <p className="mt-4 text-gray-800">
              Price <span className="text-xs">/Night</span>
            </p>
            <input
              type="number"
              placeholder="0"
              className="border border-gray-300 mt-1 rounded p-2 w-24"
              value={inputs.pricePerNight}
              onChange={(e) =>
                setInputs({ ...inputs, pricePerNight: e.target.value })
              }
            />
          </div>
        </div>
        <p className="text-gray-800 mt-4">Amenities</p>
        <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
          {Object.keys(inputs.ammenities).map((amenity, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`amenities${index + 1}`}
                checked={inputs.ammenities[amenity]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    ammenities: {
                      ...inputs.ammenities,
                      [amenity]: !inputs.ammenities[amenity],
                    },
                  })
                }
              />
              <label htmlFor={`amenities${index + 1}`}> {amenity}</label>
            </div>
          ))}
        </div>
        <button className="bg-blue-500 text-white px-8 py-2 rounded mt-8 cursor-pointer">
          {isPending ? "Adding..." : "Add Room"}
        </button>
      </form>{" "}
    </>
  );
};

export default AddRoom;
