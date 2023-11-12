import MessageListItem from "../components/MessageListItem";
import React from "react";
import { useState } from "react";
import { Emergency, getMessages } from "../data/model";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useHistory } from "react-router";

export const Home: React.FC = () => {
  const history = useHistory();
  const [Emergency, setMessage] = useState<Emergency[]>([]);

  useIonViewWillEnter(() => {
    const fetchData = async () => {
      try {
        const msgs = await getMessages();
        if (Array.isArray(msgs)) {
          setMessage(msgs);
        } else {
          console.error("Invalid data received:", msgs);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };
  const navigateToNewEmergency = () => {
    history.push("/new-emergency");
  };
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Emergencias🏥</IonTitle>
          <IonButton slot="end" onClick={navigateToNewEmergency}>
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Emergencias</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {Emergency.map((emergency) => (
            <MessageListItem key={emergency.id} message={emergency} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
