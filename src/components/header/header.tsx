import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <h1>Header</h1>
      <Link to="/home">Home</Link>
    </div>
  );
};
