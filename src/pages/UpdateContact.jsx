import { useRef, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function UpdateContact({ id }) {
  const name = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const picture = useRef();
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  let image = null;
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      image = e.target.files[0];
      uploadImage(image);
    }
  };

  const uploadImage = () => {
    const storageRef = ref(storage, `/task-images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          setUrl(url);
        });
      }
    );
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const prevContact = await axios.get(
      `https://contacts-api-r8qk.onrender.com/${id}`
    );
    let image = url ? url : picture.current.value;

    const contact = {
      name: name.current.value ? name.current.value : prevContact.name,
      email: email.current.value ? email.current.value : prevContact.email,
      phone_number: phoneNumber.current.value
        ? phoneNumber.current.value
        : prevContact.phoneNumber,
      address: address.current.value
        ? address.current.value
        : prevContact.address,
      profile_picture: image ? image : prevContact.profile_picture,
    };
    try {
      await axios.put(
        `https://contacts-api-r8qk.onrender.com/update/${id}`,
        contact
      );
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="border border-blue-300 rounded p-1">
      <button onClick={openModal}>Update</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <button onClick={closeModal}>
          <i class="bx bx-x bx-sm"></i>
        </button>
        <form
          action="post"
          onSubmit={handleClick}
          className="sm:w-[400px] w-[250px] h-[full] flex flex-col"
        >
          <input
            className="border border-blue-300 m-1 p-1 rounded"
            type="text"
            placeholder="Type your Name"
            ref={name}
          />
          <input
            className="border border-blue-300 m-1 p-1 rounded"
            type="email"
            placeholder="Type your Email (Optional)"
            ref={email}
          />
          <input
            className="border border-blue-300 m-1 p-1 rounded"
            type="tel"
            placeholder="Type your Phone Number"
            ref={phoneNumber}
          />
          <input
            className="border border-blue-300 m-1 p-1 rounded"
            type="text"
            placeholder="Type your Address"
            ref={address}
          />
          <input
            className="border border-blue-300 m-1 p-1 rounded"
            type="file"
            placeholder="Add Profile Picture"
            onChange={handleChange}
          />
          {progress > 0 && url === null ? (
            <span className="font-semibold">
              Uploading {progress}%. Please wait.
            </span>
          ) : (
            ""
          )}
          <p className="m-1">Or,</p>
          <input
            className="border border-blue-300 m-1 p-1 rounded"
            type="text"
            ref={picture}
            placeholder="Upload URL of Image"
          />
          <button
            type="submit"
            className="border border-blue-400 m-1 p-1 rounded bg-blue-400 hover:bg-blue-600 text-white font-medium"
          >
            Update Contact
          </button>
        </form>
      </Modal>
    </div>
  );
}
