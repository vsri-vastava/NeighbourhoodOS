type ButtonProps = {
  text: string;
};

function Button({ text }: ButtonProps) {
  return (
    <button
      className="relative px-6 py-3 mx-2 overflow-hidden rounded-xl border-2 border-blue-500 font-semibold text-blue-500 group cursor-pointer"
    >
      {/* Left overlay */}
      <span
        className="absolute inset-0 bg-blue-500 origin-left scale-x-0 rounded-r-full transition-transform duration-700 ease-in-out group-hover:scale-x-100"
      ></span>

      {/* Right overlay */}
      <span
        className="absolute inset-0 bg-blue-500 origin-right scale-x-0 rounded-l-full transition-transform duration-700 ease-in-out group-hover:scale-x-100"
      ></span>

      {/* Text */}
      <span className="relative z-10 transition-colors duration-700 group-hover:text-white">
        {text}
      </span>
    </button>
  );
}

export default Button;