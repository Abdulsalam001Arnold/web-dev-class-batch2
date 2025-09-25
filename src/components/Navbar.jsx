
import { Link } from "react-router-dom"


export default function Navbar() {
    return(
        <div
       className="w-full p-4 bg-black/70 backdrop-blur-2xl text-white" 
        >
            <ul className="flex items-center justify-center gap-[10px]">
            <Link to={'/'}>
                <li>
                    Home
                </li>
            </Link>

            <Link to={'/about'}>
                <li>
                    About
                </li>
            </Link>

                <Link to={'/contact'}>
                <li>
                    Contact
                </li>
                </Link>
            </ul>
        </div>
    )
};
