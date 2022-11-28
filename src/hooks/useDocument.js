import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

export const addDocument = async (collectionName, newDoc) => {
    const collectionRef = collection(firestore, collectionName)
    try {
        return await addDoc(collectionRef, newDoc)
    } catch (err) {
        return err.message
    }
}

export const deleteDocument = async (docId) => {
    try {
        await deleteDoc(doc(firestore, "todos", docId))
    } catch (err) {
        console.log(err.message)
    }
}