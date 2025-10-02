
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
    const token = localStorage.getItem("token")
    console.log(`My auth token is this: ${token}`)
            try {
                setLoading(true)
                const response = await fetch("https://nodeclass-batch2.vercel.app/all-users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if(!response.ok) throw new Error("API Failed")

                    const data = await response.json()
                    console.log(data)
                    setUsers(data)

            } catch (err) {
                
            }finally{
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if(loading) {
        return <Loader/>
    }

    return(
        <div className="w-full min-h-screen p-5">
            <h1
            className="text-xl font-bold"
            >
                All Users
            </h1>

            <div
            className="mt-[4rem]"
            >
                {users.length > 0 ? (
                    <div
                    >
                      {users.map((user, index) => (
                        <section
                        className="mb-[2rem] rounded-[20px] border flex gap-[10px] border-gray-300 p-5 justify-between"
                        >
                        <div
                        className="flex flex-col"
                        >
                            <h1
                            className="font-bold text-2xl"
                            >
                                {user.username}
                            </h1>

                            <p>email: {user.email}</p>
                        </div>

                        <Link
                        to={`/user/${user._id}`}
                        >
                        <button
                        className="bg-blue-500 p-3 rounded-[20px] text-center cursor-pointer"
                        >
                            View Profile
                        </button>
                        </Link>
                        </section>
                      ))}
                    </div>
                ): (
                    <p className="text-red-500 font-bold text-xl">
                        No user found!
                    </p>
                )}
            </div>
            
        </div>
    )
};
