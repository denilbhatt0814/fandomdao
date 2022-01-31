import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';



export default function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


  };

  return (
    <div class="w-fit h-screen md:w-96 md:max-w-full ml-24">
      <div class="text-[#ffffff] text-5xl font-bold">
        Contact Us
      </div>
  <div class="p-6 sm:rounded-md">
    <form ref={form} onSubmit={sendEmail}>
      <label class="block border-b-2 mb-20 text-[#ffffff]">
        <input
          type="text"
          name="name"
          class="
            block
            bg-[#0a111a]
            w-full
            mt-1
            shadow-sm
            focus:ring
            focus:ring-opacity-50
          "
          placeholder="Name"
        />
      </label>
      <label class="block border-b-2 mb-20 text-[#ffffff]">
        <input
          name="email"
          type="email"
          class="
            block
            w-full
            mt-1
            bg-[#0a111a]
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
          "
          placeholder="Email address"
          required
        />
      </label>
      <label class="block mb-20 text-[#ffffff]">
        <textarea
          name="message"
          class="
          block
          w-full
          mt-1
          text-[#ffffff]
          bg-[#0a111a]
          border-gray-300
          rounded-md
          shadow-sm
          focus:border-indigo-300
          focus:ring
          focus:ring-indigo-200
          focus:ring-opacity-50
          "
          rows="3"
          placeholder="Tell us what you're thinking about..."
        ></textarea>
      </label>
      <div class="mb-6">
        <button
          type="submit"
          class="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
        >
          Send
        </button>
      </div>
    </form>
  </div>
</div>

  );
}