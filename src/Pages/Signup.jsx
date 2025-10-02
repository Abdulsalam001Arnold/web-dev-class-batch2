
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        bio: ""
    })

    const [loading, setLoading] = useState(false)

    const [profilePicture, setProfilePicture] = useState(null)

    //Text inputs
    const handleChange = (e) => {
        const { name, value } = e.target

        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const fileChange = (e) => {
        setProfilePicture(e.target.files[0])
    }
    
    const handleSubmit = async (e) => {
        const formData = new FormData()
        formData.append("username", userData.username)
        formData.append("email", userData.email)
        formData.append("password", userData.password)
        formData.append("bio", userData.bio)
    
        if(profilePicture) {
            formData.append("profilePicture", profilePicture)
        }

        e.preventDefault()

        try {
            setLoading(true)

            const response = await fetch("https://nodeclass-batch2.vercel.app/post-user", {
                method: "POST",
                body: formData
            })

            if(!response.ok) throw new Error("API failed")

                if(response.status === 201) {
                    toast.success("Signed up succesfully")
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
                Signup
            </h1>

            <form
            className="flex flex-col w-full gap-[10px] items-center justify-center mt-[5rem]"
            >
                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Username
                    </label>
                    <input className="border-[1px] border-black" type="text" placeholder="Enter your full-name" name="username" value={userData.username} onChange={handleChange}/>
                </div>

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

                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                <label
                htmlFor="upload"
                >
                    Add your profile picture
                    </label>

                    {profilePicture ? <p>Selected File: {profilePicture.name}</p> : null}

                    <input type="file" id="upload" accept="image/*" onChange={fileChange} className="hidden"/>

                
                </div>

                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Bio
                    </label>
                    <textarea className="border-[1px] border-black" rows={10} cols={40}
                    value={userData.bio} name="bio" onChange={handleChange}
                    ></textarea>
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
