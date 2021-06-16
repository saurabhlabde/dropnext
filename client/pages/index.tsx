import axios from "axios";
import { FC, useState } from "react";
import { mediaUrl } from "../utils/mediaUrl";
import { media } from "../utils/media";
import { v4 } from "uuid";

const Home: FC = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showRemoveBtn, setShowRemoveBtn] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [file, setFile] = useState(null);

  const inputChangeHandel = (e: any) => {
    const resFile = media(e);
    const resConvertFile = mediaUrl(e);

    setFile(resFile);
    setSelectedImage(resConvertFile);
  };

  const uploadHandel = (e: any) => {
    e?.preventDefault();

    const formData = new FormData();

    formData.append("photo", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:5000/upload/dropbox", formData, config)
      .then((response) => {
        console.log("image upload successfully");
      })
      .catch((e) => {
        console.log("image upload error", e);
      });
  };

  const removeHandel = () => {};

  const uplodImageHoveHandel = () => {
    setShowRemoveBtn(!showRemoveBtn);
  };

  return (
    <main className="next-main">
      <div className="next-sec">
        <div className="top-sec">
          <form onSubmit={uploadHandel}>
            <div className="select-media-sec">
              <label htmlFor="next-input" className="select-label">
                {selectedImage ? (
                  <img
                    className="select-img img"
                    src={`${selectedImage}`}
                    alt={`${selectedImage}`}
                  />
                ) : (
                  <h1 className="select-img-text">
                    <span>Select image</span>
                  </h1>
                )}
              </label>
              <input
                type="file"
                id="next-input"
                hidden
                onChange={inputChangeHandel}
              />
            </div>
            <div className="upload-btn-sec">
              <button className="upload-btn" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
        {uploadedImage && (
          <div className="bottom-sec">
            <div className="upload-heading-sec">
              <h1 className="upload-heading">
                <span>Uploaded image</span>
              </h1>
            </div>
            <div
              className="upload-img-sec"
              onMouseEnter={uplodImageHoveHandel}
              onMouseLeave={uplodImageHoveHandel}
            >
              <img
                className="upload-img img"
                src={`${setUploadedImage}`}
                alt={`${setUploadedImage}`}
              />
              {showRemoveBtn && (
                <div className="remove-btn" onClick={removeHandel}>
                  <h2 className="remove-btn-text">
                    <span>REMOVE</span>
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
