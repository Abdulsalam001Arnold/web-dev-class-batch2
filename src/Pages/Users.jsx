
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import defaultAvatar from '../assets/images/default-avatar-removebg-preview.png'
import { protectedFetch } from "../utils/helper";

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await protectedFetch("https://nodeclass-batch2.vercel.app/all-users")


                    console.log("Fetched data:", data);
                    setUsers(data);

            } catch (err) {
                if(err instanceof Error) {
                    console.error(err.message)
                }
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
                        className="w-[10rem] mr-6"
                        >
                            <img
                                src={user.profile.profilePicture ? user.profile.profilePicture : defaultAvatar
                                }
                                className="rounded-[50%] object-cover"
                            />
                        </div>
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
