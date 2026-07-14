import Button from "./Button";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-slate-800 text-white">
      <h2 className="text-2xl font-bold">
        🏡 NeighbourhoodOS
      </h2>

      <div>
        <Button text="Login" />
        <Button text="Register" />
        
      </div>
    </nav>
  );
}

export default Navbar;