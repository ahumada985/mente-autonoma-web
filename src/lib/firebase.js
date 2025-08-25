// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEAgY8DqDd7Opchv6qoZd7e0imPbDr52o",
  authDomain: "mente-autonoma-leads.firebaseapp.com",
  projectId: "mente-autonoma-leads",
  storageBucket: "mente-autonoma-leads.firebasestorage.app",
  messagingSenderId: "503717123496",
  appId: "1:503717123496:web:c3ae16baccb4ade927f99d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener instancia de Firestore
export const db = getFirestore(app);

// Función para capturar leads
export const captureLead = async (email, additionalData = {}) => {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      email: email,
      timestamp: serverTimestamp(),
      source: 'website',
      ...additionalData
    });
    
    console.log('Lead capturado exitosamente con ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al capturar lead:', error);
    return { success: false, error: error.message };
  }
};

// Función para verificar si un email ya existe
export const checkEmailExists = async (email) => {
  try {
    const { getDocs, query, where } = await import('firebase/firestore');
    const q = query(collection(db, 'leads'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error al verificar email:', error);
    return false;
  }
};
