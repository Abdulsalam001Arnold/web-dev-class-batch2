
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { protectedFetch } from "../utils/helper";

export default function User() {
    const { id } = useParams()
    const [userDetails, setUserDetails] = useState({})
    const token = localStorage.getItem("token")

    useEffect(() => {
        const fetchUser = async () => {
            const response = await protectedFetch(`https://nodeclass-batch2.vercel.app/get-single/${id}`)

            // if(!response.ok) throw new Error("API Failed")
            //     console.log(response)
                console.log(response)
                setUserDetails(response)
                console.log("This is user details:", userDetails)
        }

        fetchUser()
    }, [id])
    return(
        <div
        className="w-full min-h-screen flex flex-col items-center justify-center"
        >
            <section
            className=""
            >
                <h2
                className="text-2xl text-center font-bold"
                >
                    {userDetails.username}
                </h2>

                <h2
                className="text-2xl text-center font-bold"
                >
                    {userDetails.email}
                </h2>
            </section>
        </div>
    )
};
