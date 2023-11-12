import MessageListItem from "../components/MessageListItem";
import React, { useEffect, useState } from "react";
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
  IonRouterLink,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { add, iceCream, newspaper, star } from "ionicons/icons";
import { useHistory } from "react-router";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const Home: React.FC = () => {
  const history = useHistory();
  const [Emergency, setEmergencies] = useState<Emergency[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const msgs = await getMessages();
        console.log(msgs);
        if (Array.isArray(msgs)) {
          setEmergencies(msgs as Emergency[]);
        } else {
          console.error("Invalid data received:", msgs);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, []); // ...

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const navigateToNewEmergency = () => {
    history.push("/new-emergency");
  };

  const fetchAndSetEmergencies = async () => {
    try {
      const msgs = await getMessages();
      if (Array.isArray(msgs)) {
        setEmergencies(msgs as Emergency[]);
      } else {
        console.error("Invalid data received:", msgs);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useIonViewWillEnter(() => {
    fetchAndSetEmergencies();
  });
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
            <MessageListItem key={emergency.date} message={emergency} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Home;
