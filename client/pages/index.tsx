import { FC, useState } from "react";
import axios from "axios";

// component
import { MessageCard } from "../ui/message";
import { Dropdown } from "../ui/dropdown";

// utils
import { media } from "../utils/media";
import { mediaUrl } from "../utils/mediaUrl";

interface IMessage {
  id: string;
  message: string;
  type: string;
}

const Home: FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [seletedDDItem, setSeletedDDItem] = useState("nextcloud");
  const [message, setMessage] = useState([]);

  const inputChangeHandel = (e: any) => {
    const resFile = media(e);
    const resConvertFile = mediaUrl(e);

    setFile(resFile);
    setSelectedImage(resConvertFile);
  };

  const uploadHandel = (e: any) => {
    e?.preventDefault();

    setLoading(true);

    if (loading) return;

    const formData = new FormData();

    formData.append("photo", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const uploadUrl: string = `http://localhost:5000/upload/${seletedDDItem?.toLocaleLowerCase()}`;

    axios
      .post(uploadUrl, formData, config)
      .then((res) => {
        setMessage((prevMessage) => {
          return [...prevMessage, res.data];
        });
        setSelectedImage(null);
        setFile(null);
        setLoading(false);
      })
      .catch((e) => {
        setMessage((prevMessage) => {
          return [...prevMessage, e.data];
        });
        setLoading(false);
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
            <div className="dropdown-section">
              <Dropdown
                seletedItem={seletedDDItem}
                setSeletedItem={setSeletedDDItem}
              />
            </div>
            {selectedImage && (
              <div className="upload-btn-sec">
                <button className="upload-btn" type="submit">
                  <span className="t_span">
                    {loading ? "uploading..." : "upload"}
                  </span>
                </button>
              </div>
            )}
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
