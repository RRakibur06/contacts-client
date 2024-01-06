import { useRef, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
  const name = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const picture = useRef();
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [digitError, setDigitError] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
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

    let x = phoneNumber.current.value;
    let y = String(x);
    if (y.length != 11) setDigitError(true);
    else if (y.length === 11) {
      setDigitError(false);
      const contact = {
        name: name.current.value,
        email: email.current.value,
        phone_number: phoneNumber.current.value,
        address: address.current.value,
        profile_picture: url ? url : picture.current.value,
      };
      try {
        await axios.post(
          "https://contacts-api-r8qk.onrender.com/create",
          contact
        );
        navigate("/contacts");
      } catch (error) {
        setError(error.response.data.keyValue);
        console.log(error.response.data.keyValue);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Navbar />
      <p className="text-lg font-medium">Contact Form</p>
      <form
        action="post"
        onSubmit={handleClick}
        className="sm:w-[400px] w-[250px] h-[full] flex flex-col"
      >
        <input
          className="border border-blue-300 m-1 p-1 rounded"
          type="text"
          placeholder="Type your Name"
          required={true}
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
          required={true}
          ref={phoneNumber}
        />
        <input
          className="border border-blue-300 m-1 p-1 rounded"
          type="text"
          placeholder="Type your Address"
          required={true}
          ref={address}
        />
        <input
          className="border border-blue-300 m-1 p-1 rounded"
          type="file"
          placeholder="Add Profile Picture"
          onChange={handleChange}
        />
        {progress > 0 && url === null ? (
          <span className="font-semibold m-1">
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
          Create Contact
        </button>
        {error ? (
          <p className="font-medium text-red-500 m-1">
            This name is taken already!
          </p>
        ) : (
          ""
        )}
        {error === undefined ? (
          <p className="font-medium text-red-500 m-1">
            Please input correct Phone number!
          </p>
        ) : (
          ""
        )}
        {digitError ? (
          <p className="font-medium text-red-500 m-1">
            Phone number can not be less then 11 digits!
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
