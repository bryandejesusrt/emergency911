import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { Emergency } from "../data/model";
import "./MessageListItem.css";

interface MessageListItemProps {
  message: Emergency;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem routerLink={`/llamada/${message.id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>{message.paciente}</h2>
        <h3>{message.title}</h3>
        <p>{message.description}</p>
        <span className="date">
          <IonNote>{message.date}</IonNote>
        </span>
        <i>{message.id}</i>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
