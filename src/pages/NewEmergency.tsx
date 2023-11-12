// NewEmergency.js
import React, { useState } from "react";

import {
  IonPage,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonItem,
  IonTextarea,
  IonButtons,
  IonBackButton,
  IonDatetime,
  IonModal,
  IonCard,
  IonCardContent,
  IonText,
  IonImg,
  IonNote,
  IonRedirect,
} from "@ionic/react";
import { camera, send } from "ionicons/icons";
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import firebaseApp from "../data/firebaseConfig";
import "./NewEmergency.css";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, useHistory } from "react-router-dom";
import { getMessages } from "../data/model";

// ... (importaciones)

const NewEmergency: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString()
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const lengtOfMessages = async () => {
    const messages = await getMessages();

    return String(messages.length + 1);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const selectImage = () => {
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const submitForm = () => {
    const date = new Date().toISOString();
    const title = (document.querySelector("#title") as HTMLInputElement)?.value;
    const id = (document.querySelector("#id") as HTMLInputElement)?.value;
    const pasiente = (document.querySelector("#pasiente") as HTMLInputElement)
      ?.value;
    const description = (
      document.querySelector("#description") as HTMLInputElement
    )?.value;

    if (!title || !description || !selectedImage) {
      setModalTitle("Campos vacíos");
      setModalDescription("Por favor, llena todos los campos.");
      setShowModal(true);
      return;
    }

    const db = getDatabase(firebaseApp);
    const emergenciesRef = ref(db, "llamadas");

    const newEmergency = {
      date,
      title,
      description,
      photoUrl: selectedImage,
      pasiente,
    };

    push(emergenciesRef, newEmergency)
      .then((newEmergencyRef) => {
        const newEmergencyId = newEmergencyRef.key;
        setModalTitle("Registro exitoso");
        setModalDescription(
          `La emergencia se registró correctamente. ID: ${newEmergencyId}`
        );
        setShowModal(true);
        history.push("/");
      })
      .catch((error) => {
        setModalTitle("Error al registrar la emergencia");
        setModalDescription("La emergencia no se pudo registrar." + error);
        setShowModal(true);
      });
  };

  return (
    <IonPage id="new-emergency">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-text-center">
            Registrar una emergencia🏥
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem className="items-padding">
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput
              id="title"
              placeholder="Ingresa el título"
              type="text"
            ></IonInput>
          </IonItem>

          <IonItem className="items-padding">
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonTextarea
              id="description"
              placeholder="Ingresa la descripción"
            ></IonTextarea>
          </IonItem>

          <IonItem className="items-padding">
            <IonLabel position="stacked">Pasiente</IonLabel>
            <IonInput
              id="pasiente"
              placeholder="Nombre del paciente"
            ></IonInput>
          </IonItem>

          {selectedImage && (
            <IonItem className="items-padding">
              <IonImg
                src={selectedImage}
                alt="Selected"
                style={{ marginTop: "10px", maxWidth: "100%" }}
              />
            </IonItem>
          )}

          <IonItem className="items-padding">
            <span className="date">
              <IonNote className="ion-text-start text-custom">
                {currentDateTime}
              </IonNote>
            </span>
          </IonItem>

          <IonItem className="items-padding">
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <IonButton
              className="ion-padding"
              shape="round"
              expand="full"
              onClick={selectImage}
            >
              Seleccionar imagen
              <IonIcon slot="start" icon={camera} />
            </IonButton>

            <IonButton
              className="ion-padding"
              shape="round"
              color="success"
              onClick={submitForm}
            >
              Registrar Emergencia
              <IonIcon slot="end" color="light" icon={send} />
            </IonButton>
          </IonItem>
        </IonList>

        <IonModal isOpen={showModal} className="custom-modal">
          <IonCard className="ion-padding">
            <IonCardContent className="ion-padding">
              <IonTitle>{modalTitle}</IonTitle>
              <IonLabel>{modalDescription}</IonLabel>
              <IonButton
                className="ion-padding"
                shape="round"
                expand="block"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default NewEmergency;
