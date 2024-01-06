import axios from "axios";

export default function DeleteContact({ id }) {
  const handleClick = async (id) => {
    console.log(id);
    try {
      await axios.delete(`https://contacts-api-r8qk.onrender.com/delete/${id}`);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border border-blue-300 rounded p-1">
      <button onClick={() => handleClick(id)}>Delete</button>
    </div>
  );
}
