import { useState, Dispatch, SetStateAction, FC } from "react";

interface IDropdown {
  seletedItem: string;
  setSeletedItem: Dispatch<SetStateAction<string>>;
}

export const Dropdown: FC<IDropdown> = ({ seletedItem, setSeletedItem }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const items = [
    {
      item: "nextcloud",
    },
    {
      item: "dropbox",
    },
  ];

  const dropdownHanel = () => {
    setShowDropdown(!showDropdown);
  };

  const selectItemHandel = (item: string) => {
    setSeletedItem(item);
    dropdownHanel();
  };

  return (
    <>
      <div className="drop-down-section">
        <div className="dd-top-section">
          <div className="select-item-sec dd-item" onClick={dropdownHanel}>
            <h1 className="si-text di-text">
              <span className="t_span">{seletedItem}</span>
            </h1>
          </div>
        </div>
        {showDropdown && (
          <div className="dd-bottom-section">
            {items?.map((item: any, i: number) => {
              return (
                <div
                  key={`${i}-dropdown-item`}
                  className="drop-down-item dd-item"
                  onClick={() => {
                    selectItemHandel(item.item);
                  }}
                >
                  <h1 className="dd-text di-text">
                    <span className="t_span">{item.item}</span>
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
