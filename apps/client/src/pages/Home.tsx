function Home() {
  return (
    <section className="flex flex-col justify-center items-center h-[90vh] text-center">
      <h1 className="text-5xl font-bold text-slate-800">
        Welcome to NeighbourhoodOS 🏡
      </h1>

      <p className="mt-5 text-lg text-gray-600 max-w-xl">
        Connecting communities, people, and local services
        in one smart neighbourhood platform.
      </p>

      <button
  className="relative mt-8 px-6 py-3 overflow-hidden rounded-lg border-2 border-blue-500 text-blue-500 font-semibold group cursor-pointer"
>
  {/* Left overlay */}
  <span className="absolute inset-0 bg-blue-500 origin-left scale-x-0 rounded-r-full transition-transform duration-700 ease-in-out group-hover:scale-x-100"></span>

  {/* Right overlay */}
  <span className="absolute inset-0 bg-blue-500 origin-right scale-x-0 rounded-l-full transition-transform duration-700 ease-in-out group-hover:scale-x-100"></span>

  {/* Text */}
  <span className="relative z-10 transition-colors duration-700 group-hover:text-white">
    Get Started
  </span>
</button>
  
    </section>
  );
}

export default Home; 
