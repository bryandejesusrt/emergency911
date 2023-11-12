import React, { useState, useEffect } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewDidEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import { getDatabase, ref, get, child } from "firebase/database";
import firebaseApp from "../data/firebaseConfig";
import "./ViewMessage.css";
import { getMessageById, Emergency } from "../data/model";

function ViewMessage() {
  const [emergencyData, setEmergencyData] = useState<Emergency | null>(null);
  const params = useParams<{ date: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const msgs: any = await getMessageById(params.date);
        if (Array.isArray(msgs)) {
          setEmergencyData(msgs[0]);
        } else {
          console.error("Invalid data received:", msgs);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, []); // ...
  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Inicio" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {emergencyData ? (
          <>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={personCircle}
                color="primary"
              ></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {emergencyData.title}
                  <span className="date">
                    <IonNote>{emergencyData.date}</IonNote>
                  </span>
                </h2>
                <h3>
                  To: <IonNote>{emergencyData.pasiente}</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <p>{emergencyData.description}</p>

              <img src={emergencyData.photoUrl} alt="Emergency" />
              <p>{emergencyData.date}</p>
            </div>
          </>
        ) : (
          <div>No se encontraron mensajes</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
