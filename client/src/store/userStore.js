import {  useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { useEffect } from "react";
import { persist } from "zustand/middleware";
import { useMutation } from "@tanstack/react-query";
import api from "../config/api";


const useUserDetailsStore = create(
  persist(
    (set) => ({
      isOwner: false,
      showHotelReg: false,
      searchedCities: [],
      formError: "",
      setisOwner: (val) => set({ isOwner: val }),
      setshowHotelReg: (val) => set({ showHotelReg: val }),
      setsearchedCities: (val) => set({ searchedCities: val }),
      setFormError: (val) => set({ formError: val }),
    }),
    { name: "user-state" },
  ),
);

export function useUserDetails() {
  const { user } = useUser();
 
  const navigate = useNavigate();
  const {
    isOwner,
    setisOwner,
    showHotelReg,
    setshowHotelReg,
    searchedCities,
    setsearchedCities,
    formError,
    setFormError,
  } = useUserDetailsStore();

  const { mutate } = useMutation({
    mutationFn: async ({ userId }) => {
   
      const response = await api.get(`/user`,userId);
      return response.data;
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setFormError(error.response?.data.message || "Error fetching user");
      } else {
        setFormError("Something went wrong");
      }
    },
    onSuccess: (data) => {
      setisOwner(data.role === "hotelOwner");
      setsearchedCities(data.recentSearchedCities || []);
    },
  });

  useEffect(() => {
    if (user?.id) mutate({ userId: user.id });
  }, [user]);

  return {
    isOwner,
    showHotelReg,
    searchedCities,
    formError,
    setshowHotelReg,
    setFormError,
    navigate,
  };
}
