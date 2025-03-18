import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({  // create mane ai custom hooks ta create kora hoise 
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,  // ata mane fontend theke backend er data data lenden a permitions dei.
})

// validata the hooks-------

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(  //axiosSecure er response er mordhe ja astese seita interceptors er mordhome check kora hoitese =======>>>>>>> ai intercaptor duita parameter nei 
            res => {
                return res; //// res parameter er kaj holo sob jodi thik thak thake taile tare thik moto data dibo 
            },
            async error => {  // error hoile tare logout korbo and login page a redirect kore dibo 
                if (error.response.status === 401 || error.response.status === 403) {

                    /// logout 
                    logOut()
                    // navigate the login page 
                    navigate("/login")
                }
                console.log("tumi vul email ta pass korteso");
            }
        )
    }, [logOut, navigate])
    return axiosSecure;
}

export default useAxiosSecure;