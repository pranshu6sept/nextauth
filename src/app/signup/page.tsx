"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage(){
    const router = useRouter();

    const [user, setUser] = useState({
        email:"",
        password:"",
        username:""
    })

    const [buttonDisabled, setbuttonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup =async () => {
       
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup success",response.data);
            toast.success("Signup success");
            router.push('/login')            
        } catch (error:any) {
            console.log("signup failed");
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setbuttonDisabled(false)
        }else{
            setbuttonDisabled(true)
        }
    },[user])

    return(
        <div className="flex flex-col items-center justify-center h-screen dark py-2">
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">
                        { loading ? "Processing" :"Sign Up"}</h2>
                    <form className="flex flex-col">
                        <label className="text-sm text-gray-200 cursor-pointer" htmlFor="username">
                            Username
                        </label> 
                        <input
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 
                                mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 
                                focus:ring-blue-500 transition ease-in-out duration-150"
                        id='username'
                        value={user.username}
                        onChange={(e) => setUser({...user,username : e.target.value})}
                        type="text"
                        placeholder="username"
                        />
                        <label className="text-sm text-gray-200 cursor-pointer" htmlFor="email">
                            Email
                        </label> 
                        <input
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 
                                mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 
                                focus:ring-blue-500 transition ease-in-out duration-150"
                        id='email'
                        value={user.email}
                        onChange={(e) => setUser({...user,email : e.target.value})}
                        type="text"
                        placeholder="email"
                        />
                        <label className="text-sm text-gray-200 cursor-pointer" htmlFor="password">
                            Password
                        </label> 
                        <input
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 
                                mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 
                                focus:ring-blue-500 transition ease-in-out duration-150"
                        id='email'
                        value={user.password}
                        onChange={(e) => setUser({...user,password : e.target.value})}
                        type="text"
                        placeholder="password"
                        />
                        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 
                                        text-white font-bold py-2 px-4 rounded-md mt-4 
                                        hover:bg-indigo-600 hover:to-blue-600 transition 
                                        ease-in-out duration-150" 
                                type="submit"
                                onClick={onSignup}
                        >
                            {buttonDisabled ? "Fill the form" : "SignUp"}
                        </button>
                        <Link href="/login">Visit Login Page</Link>
                    </form>
                </div>
            </div>
    )
}

