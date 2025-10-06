
import { useState, useEffect, useContext } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import defaultAvatar from '../assets/images/default-avatar-removebg-preview.png'
import { protectedFetch } from "../utils/helper";
import { UserContext } from "../context/UserContext";
export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const { token, user, logout } = useContext(UserContext)

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

    const handleDelete = async(userId) => {
        try {
            const data = await protectedFetch(`https://nodeclass-batch2.vercel.app/delete/${userId}`, {
                method: "DELETE"
            })
            if(data) {
                console.log(data)
                setUsers(users.filter(user => user._id !== userId))
            }

        } catch (err) {
            if(err instanceof Error) {
                return(
                    <p>
                        {err.message}
                    </p>
                )
            }
        }
    }

    if(loading) {
        return <Loader/>
    }

    return(
        <div className="w-full min-h-screen p-5">
            <h1
            className="text-xl font-bold"
            >
                All Users (Welcome {user.username})
            </h1>

            <button
            onClick={logout}
            >
                Logout
            </button>

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
                        
                        <div
                        className="flex flex-col gap-[5px]"
                        >
                        <Link
                        to={`/user/${user._id}`}
                        >
                        <button
                        className="bg-blue-500 p-3 rounded-[20px] text-center cursor-pointer"
                        >
                            View Profile
                        </button>
                        </Link>
                        
                        <button
                        className="bg-red-500 p-3 rounded-[20px] text-center cursor-pointer"
                        onClick={() => handleDelete(user._id)}
                        >
                            Delete User
                        </button>

                        </div>
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
