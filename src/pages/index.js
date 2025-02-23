import { useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef();
  const [shortUrl, setShortUrl] = useState([]);
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://sqrt-nine.vercel.app";

  const fetchUrls = async () => {
    try {
      const res = await fetch("/api/getUrl");
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      setShortUrl(data);
    } catch (error) {}
  };

  const handleDelete = async (short) => {
    try {
      const res = await fetch("/api/deleteUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ short }),
      });

      if (!res.ok) {
        throw new Error("Error");
      }
      fetchUrls();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = inputRef.current.value;

    if (!url) {
      alert("Por favor, ingresa una URL válida.");
      return;
    }

    const urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(url)) {
      alert(
        "Por favor, proporciona una URL válida (ejemplo: https://www.ejemplo.com)."
      );
      return;
    }

    try {
      const res = await fetch("/api/shortUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      fetchUrls();
      inputRef.current.value = "";
    } catch (error) {}
  };

  useEffect(() => {
    fetchUrls();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">URL Shortner</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Place your url here"
          className="border p-1 border-2 rounded m-2"
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-lg font-semibold p-2 text-white hover:bg-blue-400 transition active:bg-blue-600 active:scale-95"
        >
          Short Time!
        </button>
      </form>

      {shortUrl.map((url) => (
        <div
          key={url.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-6 m-2 max-w-md w-full"
        >
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-semibold">URL:</span>
            <h4 className="font-bold text-blue-600 break-all">{url.url}</h4>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-semibold">Shortened:</span>
            <button
              onClick={() => window.open(`/api/${url.short}`, "_blank")}
              className="text-green-600 font-bold hover:underline"
            >
              {baseUrl}/api/{url.short}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 font-semibold">Created:</span>
            <p className="text-gray-700">
              {new Date(url.created_at).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={url.qr_code}
              alt={`QR Code for ${url.short}`}
              className="w-32 h-32 object-cover rounded-md border border-gray-200"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(url.short)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}