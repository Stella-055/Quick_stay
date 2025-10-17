import { useAuth ,useUser} from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'
import { useState } from 'react'
import { persist } from 'zustand/middleware'
const userStore= (set) => {

const {user }= useUser()
const {getToken} = useAuth();

const navigate = useNavigate();
const [isOwner ,setisOwner]=useState(false)
const [showHotelReg ,setshowHotelReg]=useState(false)
    return {
        firstName: "John",
        lastName: "Doe",
        age: 38
    }
}

const useUser = create(persist(userStore, { name: "user-state" }));;

export default useUser;