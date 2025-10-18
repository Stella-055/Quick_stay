import { useAuth ,useUser} from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'
import { useEffect, useState } from 'react'
import { persist } from 'zustand/middleware'
import {
 
 useMutation
   
  } from '@tanstack/react-query'
import api from '../config/api'
  
const userStore= (set) => {

const {user }= useUser()
const {getToken} = useAuth();

const navigate = useNavigate();
const [isOwner ,setisOwner]=useState(false)
const [showHotelReg ,setshowHotelReg]=useState(false)
const[searchedCities,setsearchedCities]= useState([])
const [formError,setFormError]= useState("")
const { mutate } = useMutation({
    queryKey: ["get-user-data"],
    queryFn: async (userId) => {
      const response = await api.get(
        "/api/user",userId,{headers: {Authorization: `Bearer ${await getToken()}`}}
      );
      return response.data;
    },
    onError: (error) => {
        if (axios.isAxiosError(error)) {
          setFormError(error.response?.data.message);
          return;
        } else {
          setFormError("something went wrong");
          return;
        }
      },
      onSuccess: (data) => {
      setisOwner(data.role==="hotelOwner")
      setsearchedCities(data.recentSearchedCities)
      },
  });

useEffect(()=>mutate({userId:user.id}),[user])
    return {
       isOwner,
       setisOwner,
       showHotelReg,
       setshowHotelReg,
       searchedCities,
       setsearchedCities,
         formError,
            setFormError
      
    }
}

const useUser = create(persist(userStore, { name: "user-state" }));;

export default useUser;