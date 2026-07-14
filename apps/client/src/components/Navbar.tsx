import Button from "./Button";
function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "#1e293b",
        color: "white",
      }}
    >
      <h2>🏡 NeighbourhoodOS</h2>

      <div>
  <Button text="Login" />
  <Button text="Register" />
</div>
    </nav>
  );
}

export default Navbar;