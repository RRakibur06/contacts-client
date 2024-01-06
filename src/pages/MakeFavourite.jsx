import axios from "axios";

export default function MakeFavourite({ id, favourite }) {
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://contacts-api-r8qk.onrender.com/favourite/${id}`);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border border-blue-300 rounded">
      {favourite ? (
        <button onClick={handleClick} className="bg-blue-300 p-1">
          Favourite
        </button>
      ) : (
        <button onClick={handleClick} className="p-1">
          Make Favourite
        </button>
      )}
    </div>
  );
}
