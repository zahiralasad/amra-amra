import { useEffect, useState } from "react";
import axios from 'axios';

function ImageManager() {
    const [images, setImages] = useState([]); // array of image objects or URLs
    const dataUrl = "https://amra-amra.se/db/";
    const [error, setError] = useState(null);
    
  useEffect(() => {
    const table="members";
    axios.get(dataUrl, {
            params: { request: "getatablesdata", table }
            })
      .then(function (response) {
        if (response.data !== "") {
          console.log(response.data);
        //   setLoadMembersInput(false);
        }
        else {
          alert("Failed to fetch member data");
        //   setLoadMembersInput(false);
        }
      })
      .catch(error => {
        setError(error.message);
        // setLoadMembersInput(false);
      })

  }, []);
    const addImages = (files) => {
        const newImages = Array.from(files).map((file) => ({
            id: crypto.randomUUID(), // unique key for removal + React list key
            file,                    // the actual File object, needed if uploading later
            url: URL.createObjectURL(file), // temp local preview URL
        }));
        setImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            addImages(e.target.files);
            e.target.value = ""; // allows re-selecting the same file later
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {images.map((img) => (
                    <div key={img.id} style={{ position: "relative" }}>
                        <img
                            src={img.url}
                            alt=""
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                        <button
                            onClick={() => removeImage(img.id)}
                            style={{
                                position: "absolute",
                                top: "2px",
                                right: "2px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageManager;