// Asegúrate de que la ruta sea correcta
import { getDatabase, ref, get, child } from "firebase/database";
import firebaseApp from "./firebaseConfig";

export interface Emergency {
  id: number;
  date: string;
  title: string;
  description: string;
  photoURL: string;
  paciente: string;
}

export const getMessages = async () => {
  const db = getDatabase(firebaseApp);
  const messagesRef = ref(db, "llamada"); // Ajusta la ruta según la ubicación real de tus mensajes

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

export const getMessagesByid = async (id: string) => {
  const db = getDatabase(firebaseApp);
  const messagesRef = ref(db, `llamada/${id}`); // Ajusta la ruta según la ubicación real de tus mensajes

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
