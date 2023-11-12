// Asegúrate de que la ruta sea correcta
import { getDatabase, ref, get, child } from "firebase/database";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

export interface Emergency {
  id: number;
  date: string;
  title: string;
  description: string;
  photoUrl: string;
  pasiente: string;
}

export const getMessages = async () => {
  const db = getDatabase(firebaseApp);
  const messagesRef = ref(db, "llamadas"); // Ajusta la ruta según la ubicación real de tus mensajes

  try {
    const snapshot = await get(child(messagesRef, "/"));
    if (snapshot.exists()) {
      const messages = Object.values(snapshot.val());
      return messages;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const getMessageById = async (date: string) => {
  const db = getDatabase(firebaseApp);
  const messagesRef = ref(db, "llamadas"); // Ajusta la ruta según la ubicación real de tus mensajes

  try {
    const snapshot = await get(child(messagesRef, "/"));
    if (snapshot.exists()) {
      const messages = Object.values(snapshot.val()).filter(
        (m: Emergency) => m.date == date
      );
      return messages;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
