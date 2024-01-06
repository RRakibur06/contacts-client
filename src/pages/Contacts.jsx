import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import UpdateContact from "./UpdateContact";
import DeleteContact from "./DeleteContact";
import MakeFavourite from "./MakeFavourite";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await axios.get("https://contacts-api-r8qk.onrender.com/all");
      setContacts(res.data);
    };
    fetchContacts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center m-5">
      <Navbar />
      <p className="text-lg font-medium mb-5">Contacts</p>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-2 w-[90%]">
        {contacts &&
          contacts.map((contact, i) => (
            <div
              className="col-span-1 border border-blue-300 flex flex-col p-2 rounded"
              key={i}
            >
              <div className="flex justify-between items-center w-full mb-2">
                <UpdateContact id={contact._id} />
                <DeleteContact id={contact._id} />
                <MakeFavourite id={contact._id} favourite={contact.favourite} />
              </div>
              <img
                src={contact.profile_picture}
                alt="Contact"
                className="w-[100px] h-[100px] rounded-[50%] border border-black mx-auto"
              />
              <div className="flex items-center">
                <p className="font-semibold mr-3">Name:</p>
                <p>{contact.name}</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold mr-3">Email:</p>
                <p>{contact.email}</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold mr-3">Phone Number:</p>
                <p>{contact.phone_number}</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold mr-3">Address:</p>
                <p>{contact.address}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
