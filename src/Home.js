import React from "react";

const Home = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1487700160041-babef9c3cb55?q=100&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", // Background image URL
      }}
    >
      <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen">
        {/* Gradient background removed */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-20 min-h-screen">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Discover our new seasonal menu!{" "}
              <a href="#" className="font-semibold text-green-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-green-900 sm:text-7xl">
              Welcome to SAC Savory&reg;
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
              Indulge in our delicious menu, crafted with the finest ingredients
              and served with a smile. Whether you're here for a family meal or
              a quick bite, we have something for everyone!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Order Now
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                View Menu <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
