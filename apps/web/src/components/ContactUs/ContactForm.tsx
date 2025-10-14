import React from "react";

const ContactForm = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-black via-gray-900 to-yellow-600">
      {/* Animated points */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white rounded-full opacity-40`}
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i % 3} ${2 + Math.random() * 4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full sm:max-w-md bg-black/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 text-white mt-10">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Contact Us</h1>
          <p className="text-gray-300 text-sm">
            We’d love to hear from you! Fill in the form below.
          </p>
        </div>

        <form className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
          />
          <textarea
            name="message"
            placeholder="Type your message here..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all resize-none"
          />
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-3">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:opacity-90 text-gray-900 font-semibold py-2 px-5 rounded-lg shadow transition-all"
            >
              Send ➤
            </button>
            <button
              type="reset"
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-all"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Custom animations for points */}
    </div>
  );
};

export default ContactForm;
