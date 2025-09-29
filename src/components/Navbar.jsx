
import { Link, useLocation } from "react-router-dom"


export default function Navbar() {
    const location = useLocation()
    return(
        <div
       className="w-full p-4 bg-black/70 backdrop-blur-2xl text-white" 
        >
            <ul className="flex items-center justify-center gap-[10px]">
            <Link to={'/'}>
                <li
                className={`${location.pathname === '/' ? 'text-green-600 font-bold text-[40px]' : 'text-white text-[20px] font-light'}`} 
                >
                    Home
                </li>
            </Link>

            <Link to={'/about'}>
                <li
                className={`${location.pathname === '/about' ? 'text-green-600 font-bold text-[40px]' : 'text-white text-[20px] font-light'} `}
                >
                    About
                </li>
            </Link>

                <Link to={'/contact'}>
                <li>
                    Contact
                </li>
                </Link>

                <Link to={'/signup'}>
                <li
                className={`${location.pathname === '/signup' ? 'text-green-600 font-bold text-[40px]' : 'text-white text-[20px] font-light'} `}
                >
                    Signup
                </li>
            </Link>
            </ul>
        </div>
    )
};
