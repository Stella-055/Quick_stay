import React from "react";
import { useState } from "react";
import Title from "../../Components/Title";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import api from "../../config/api";
import { useUser } from "@clerk/clerk-react";
const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const {user}=useUser();
  const userDetails={userId:user.id}
  const getRooms = useMutation({
    mutationKey: ['listRoom'],
    mutationFn: async (userDetails) => {
   
      const response = await api.post(`/room`,userDetails);
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
      setRooms(data.rooms);
    },  });
  React.useEffect(() => {
    getRooms.mutate(userDetails);
  }, [user]);
  const toggleAvailability = useMutation({
    mutationKey: ['toggleAvailability'],
    mutationFn: async ({userId, roomId}) => {
     const response = await api.patch(`/availability/${roomId}`,{userId});
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
     toast.success("Updated Successfully",{position: "top-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: false,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             transition: Bounce,});
       
      getRooms.mutate(userDetails);
         
    },  });
  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum amet illum, voluptatibus ab est cumque hic corporis consectetur facere. Recusandae officiis ullam laborum sequi corporis quidem minus rerum in eum."
      />
      <p className="text-gray-500 mt-8">All Rooms</p>
      <div className=" mt-3 w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium"> Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium ">
                Price Per Night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-gray-300 max-sm:hidden border-t">
                  {item.amenities.join(",")}
                </td>
                <td className="py-3 px-4 text-gray-700border-gray-300 text-center">
                  ${item.pricePerNight}
                </td>
                <td className="py-3 px-4  border-t border-gray-300 text-center text-sm text-red-500">
                  <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      onChange={() => toggleAvailability.mutate({userId:user.id, roomId:item._id})}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className=" dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  );
};

export default ListRoom;
