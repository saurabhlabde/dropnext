import { FC } from "react";

interface IMessageCard {
  props: {
    id: string;
    message: string;
    type: string;
  };
  onClose: (id: string) => void;
}

export const MessageCard: FC<IMessageCard> = ({ props, onClose }) => {
  const { id, message, type } = props;
  return (
    <div className={`message-card  ${type}-message-card`} id={`${id}-card`}>
      <div className="message-sec">
        <h1 className="message-text">
          <span>{message}</span>
        </h1>
      </div>
      <div
        className={`close-message-btn-sec ${type}-close-message-btn-sec`}
        onClick={() => {
          onClose ? onClose(id) : undefined;
        }}
      >
        <h1 className="close-btn-text">
          <span>Close</span>
        </h1>
      </div>
    </div>
  );
};
