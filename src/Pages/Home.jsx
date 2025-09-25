
import Counter from "../components/Counter"
import { useState, useEffect } from "react"
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {

    const year = new Date().getFullYear()
const [counter, setCounter] = useState(0)

const navigate = useNavigate()

useEffect(() => {
  //code goes here
  document.title = `Count is ${counter}`
}, [counter])

const handleMinus = () => {
  if(counter > 0) {
    setCounter(counter - 1)
  }
}

const programmaticNavigation = () => {
    navigate('/about')
    console.log("Got navigated programmatically!")
}
    return(
        <main>
       <h1 className="text-red-600">
        Hello React!!
       </h1>

       <h3>
        The year is {year} iojoijiohjrgoiheroiherhhr
       </h3>

       <Counter
       name={'Component'}
       />


       <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">
          {counter}
        </h1>

        <div
        className="flex gap-[10px]"
        >
          <button
          onClick={() => setCounter(counter + 1)}
          >
            Add
          </button>

          <button
          onClick={handleMinus}
          >
            Minus
          </button>

          <FaGoogle className="text-lg"/>
        </div>
        <Link to={'/about'}>
                Go to about page.
        </Link>

        <button
        onClick={programmaticNavigation}
        >
            programmaticNavigation
        </button>
       </div>
    </main>
    )
};
