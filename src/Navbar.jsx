import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <NavLink to="/">
        <button className="border border-blue-400 p-1 m-2 rounded">
          Add Contacts
        </button>
      </NavLink>
      <NavLink to="/contacts">
        <button className="border border-blue-400 p-1 m-2 rounded">
          All Contacts
        </button>
      </NavLink>
    </div>
  );
}
