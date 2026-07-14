type ButtonProps = {
  text: string;
};

function Button({ text }: ButtonProps) {
  return (
    <button
      style={{
        padding: "10px 20px",
        margin: "5px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}

export default Button;