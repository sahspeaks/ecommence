import React from "react";
import { Title } from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { ToastContainer, toast } from "react-toastify";

function Contact() {
  const handleOnClick = (event) => {
    event.preventDefault();
    toast.success("Stay Tuned. This feature is coming soon!");
    // Handle form submission here
  };
  return (
    <div className="px-10">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={" US"} />
      </div>
      <div className="my-10 flex flex-col justify-center items-center md:flex-row gap-10 mb-28">
        <img
          className="w-[40vw] h-[40vw] rounded-lg"
          src={assets.contact_img}
          alt="Moonsflare Contact"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Get in Touch</p>
          <p className="text-gray-500">
            Moonsflare
            <br />
            Tirupati, Andhra Pradesh
            <br />
            India
          </p>
          <div className="text-gray-500">
            <p>WhatsApp: 7569795229</p>
            <p className="text-sm italic">
              (Contact us via WhatsApp for the fastest response)
            </p>
            <p className="mt-2">Email: store.moonsflare@gmail.com</p>
          </div>
          <p className="font-semibold text-xl text-gray-600 mt-4">
            Join Our Team
          </p>
          <p className="text-gray-500">
            Want to be part of something amazing? Explore opportunities to join
            our creative team at Moonsflare.
          </p>
          <button
            onClick={handleOnClick}
            className="border border-black px-8 py-4 text-sm hover:bg-orange-300 transition-all duration-500"
          >
            Explore Jobs
          </button>
        </div>
      </div>
      <ToastContainer />
      <NewsletterBox />
    </div>
  );
}

export default Contact;
