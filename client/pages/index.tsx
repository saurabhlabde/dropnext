import axios from "axios";
import { FC, useState } from "react";
import { mediaUrl } from "../utils/mediaUrl";
import { media } from "../utils/media";
import { MessageCard } from "../ui/message";

interface IMessage {
  id: string;
  message: string;
  type: string;
}

const Home: FC = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState([]);

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
      .post("http://localhost:5000/upload/nextcloud", formData, config)
      .then((res) => {
        setMessage((prevMessage) => {
          return [...prevMessage, res.data];
        });
        setSelectedImage(null);
        setFile(null);
      })
      .catch((e) => {
        setMessage((prevMessage) => {
          return [...prevMessage, e.data];
        });
      });
  };

  const closeHandel = (id: string) => {
    const filterMessage: Array<IMessage> = message?.filter((mess: IMessage) => {
      return mess.id !== id;
    });

    setMessage(filterMessage);
  };

  const removeHandel = () => {
    setSelectedImage(null);
    setFile(null);
  };

  return (
    <main className="next-main">
      <div className="next-sec">
        <div className="top-sec">
          <form onSubmit={uploadHandel}>
            <div className="select-media-sec">
              {selectedImage && (
                <div className="remove_btn" onClick={removeHandel}>
                  <h1 className="remove_btn_text">
                    <span className="t_span">remove</span>
                  </h1>
                </div>
              )}
              <label htmlFor="next-input" className="select-label">
                {selectedImage ? (
                  <img
                    className="select-img img"
                    src={`${selectedImage}`}
                    alt={`${selectedImage}`}
                  />
                ) : (
                  <h1 className="select-img-text">
                    <span className="t_span">select image</span>
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
                <span className="t_span">upload</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {message?.length >= 1 && (
        <div className="pop-message-section">
          {message?.map((props: IMessage) => {
            return (
              <MessageCard key={props.id} props={props} onClose={closeHandel} />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Home;
