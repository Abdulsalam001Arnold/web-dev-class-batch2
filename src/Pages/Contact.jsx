
import { useState } from "react"

export default function Contact() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("")

    return(
        <div
        className="w-full min-h-screen flex flex-col items-center justify-center"
        >
            <h1>
                Contact form - {email}
            </h1>

            <form
            className="flex flex-col w-full gap-[10px]"
            >
                <div
                className="flex flex-col gap-[4px]"
                >
                    <label>
                        Full Name
                    </label>
                    <input type="text" placeholder="Enter your full-name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                </div>

                <div
                className="flex flex-col gap-[4px]"
                >
                    <label>
                        Email
                    </label>
                    <input placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div
                className="flex flex-col gap-[4px]"
                >
                    <label>
                        Phone number
                    </label>
                    <input type="tel" placeholder="Enter your phone-number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>

                <div
                className="flex flex-col gap-[4px]"
                >
                    <label>
                        Message
                    </label>
                    <textarea rows={10} cols={40}
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
            </form>
        </div>
    )
};

