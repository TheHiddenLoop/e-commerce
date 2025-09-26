import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { useInView } from "react-intersection-observer";
import { supportAuth } from "../../features/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });
    const dispatch=useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(supportAuth(formData));
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <div ref={ref} className={`flex items-center justify-center text-textPrimary  md-2 md:p-6 ${inView ? "fade-in" : "opacity-0 translate-y-8"}`}>
            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 md:shadow-skin  overflow-hidden transition-skin rounded-md">

                <div className=" text-textPrimary p-6 flex flex-col items-center justify-between ">
                    <div className="">
                        <img
                            src="/logo3.png"
                            alt="Company Logo"
                            className="w-auto h-[130px] rounded-lg"
                        />
                    </div>
                    <div className="mb-6 hidden md:block">
                        <img
                            src="/illus.svg"
                            alt="E-commerce"
                            className="h-[250px] w-auto"
                        />
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold mb-1">Your Shopping Partner</h2>
                        <p className="text-textSecondary text-xs leading-snug max-w-xs">
                            Best deals, exclusive collections, and hassle-free shopping — delivered
                            securely to your doorstep.
                        </p>
                    </div>
                </div>

                <div className=" p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-12">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-border rounded-lg bg-bgPrimary text-textPrimary placeholder-textSecondary focus:ring-2 focus:ring-ring outline-none"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-border rounded-lg bg-bgPrimary text-textPrimary placeholder-textSecondary focus:ring-2 focus:ring-ring outline-none"
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            className="w-full p-3 border border-border resize-none rounded-lg bg-bgPrimary text-textPrimary placeholder-textSecondary focus:ring-2 focus:ring-ring outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-secondary text-textPrimary p-3 rounded-lg font-medium hover:bg-accent transition-skin"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
