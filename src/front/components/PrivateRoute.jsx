import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute =({children})=>{
    const {dispatch} = useGlobalReducer();

    const navigate = useNavigate()
    
    const fetchUser = async() =>{
        try{
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")
            
            const token = localStorage.getItem('token');

            if(!token){
                navigate('/login')
                return null;
            }
            const userResponse = await fetch(`${backendUrl}/api/user/personal-data`,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`

                }
            });
            const user = await userResponse.json()
            dispatch({
                type:'set_user',
                payload:{
                    user:user.user
                }
            })
            return user;
        }catch{
            navigate('/login')
            throw Error('Error get user')
            
        }
    }

    useEffect(()=>{

        fetchUser()

    }, [])

    return (
        <>
        {children}
        </>
    )
}