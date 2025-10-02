


import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)

    //Text inputs
    const handleChange = (e) => {
        const { name, value } = e.target

        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const response = await fetch("https://nodeclass-batch2.vercel.app/login", {
                method: "POST",
                headers: {
      "Content-Type": "application/json",
    },
                body: JSON.stringify(userData)
            })

            if(!response.ok) throw new Error("API failed")

                if(response.ok) {
                    toast.success("Logged in succesfully")
                    const data = await response.json()
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    navigate("/")
                }
        } catch (err) {
                console.error(err.message)
                toast.error(err.cause)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div
       className="w-full flex flex-col items-center justify-center" 
        >
        <ToastContainer/>
            <h1>
                Login
            </h1>

            <form
            className="flex flex-col w-full gap-[10px] items-center justify-center mt-[5rem]"
            >
                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Email
                    </label>
                    <input className="border-[1px] border-black" placeholder="Enter your email" type="email" name="email" value={userData.email} onChange={handleChange}/>
                </div>

                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Password
                    </label>
                    <input className="border-[1px] border-black" type="password" placeholder="Enter your password" name="password" value={userData.password} onChange={handleChange}/>
                </div>


                <button
                className="p-5 bg-blue-600 text-white rounded-[20px] cursor-pointer"
                onClick={handleSubmit}
                >
                    {loading ? "Loading....." : "Submit"}
                </button>
            </form>
        </div>
    )
};
