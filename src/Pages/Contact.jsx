
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

export default function Contact() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: ""
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await fetch('https://nodeclass-batch2.vercel.app/post-contact', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
    
            console.log(response)
    
            if(!response.ok) throw new Error("API Failed")
    
                if(response.status === 201) {
                    toast.success("Form submited successfully.")
                }
            
        } catch (err) {
            console.error(err)
        }finally {
            setLoading(false)
        }
    }


    return(
        <div
        className="w-full min-h-screen flex flex-col items-center justify-center"
        >
        <ToastContainer/>
            <h1>
                Contact form - {formData.fullName}
            </h1>

            <form
            className="flex flex-col w-full gap-[10px] items-center justify-center mt-[5rem]"
            >
                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Full Name
                    </label>
                    <input className="border-[1px] border-black" type="text" placeholder="Enter your full-name" name="fullName" value={formData.fullName} onChange={handleChange}/>
                </div>

                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Email
                    </label>
                    <input className="border-[1px] border-black" placeholder="Enter your email" type="email" name="email" value={formData.email} onChange={handleChange}/>
                </div>

                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Phone number
                    </label>
                    <input className="border-[1px] border-black" type="tel" placeholder="Enter your phone-number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
                </div>

                <div
                className="flex flex-col gap-[1.5rem] mb-[1.5rem]"
                >
                    <label>
                        Message
                    </label>
                    <textarea className="border-[1px] border-black" rows={10} cols={40}
                    value={formData.message} name="message" onChange={handleChange}
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

