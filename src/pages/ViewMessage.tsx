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
import { Emergency } from "../data/model";

function ViewMessage() {
  const [emergencyData, setEmergencyData] = useState<Emergency | null>(null);
  const params = useParams<{ id: string }>();

  useIonViewDidEnter(() => {
    console.log("ionViewWillEnter event fired");
    const db = getDatabase(firebaseApp);
    const messageRef = ref(db, `llamada/1/${params.id}`);

    get(child(messageRef, "/"))
      .then((snapshot) => {
        console.log(snapshot.val());
        console.log(params.id);
        if (
          snapshot.exists() &&
          snapshot.val() !== null &&
          snapshot.val() !== undefined
        ) {
          setEmergencyData(snapshot.val());
        } else {
          setEmergencyData(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        setEmergencyData(null);
      });
  });
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
                  To: <IonNote>Me</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{emergencyData.title}</h1>
              <p>{emergencyData.date}</p>
              {emergencyData.photoURL && (
                <img src={emergencyData.photoURL} alt="Emergency" />
              )}
            </div>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
