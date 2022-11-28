import { collection, getDocs, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { firestore } from "../firebase/config"

export const getCollection = (collectionName) => {
    const [documents, setDocuments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const collectionRef = query(collection(firestore, collectionName))

    const getDocuments = async () => {
        try {
            setIsLoading(true)
            const response = await getDocs(collectionRef)
            setDocuments(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }
    useEffect(() => {
        getDocuments()
    }, [])

    return { documents, error, isLoading }
}