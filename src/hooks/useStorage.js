import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { firestore, storage } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { useState } from "react"

export const useStorage = () => {
    const [error, setError] = useState("")
    const params = useParams()

    const updateImages = async (files, images = []) => {
        try {
            let filesUrl = files.map(async (file) => {
                return new Promise(async (res, rej) => {
                    try {
                        const filePath = `todos/${file.name}`
                        const fileRef = await uploadBytesResumable(ref(storage, filePath), file)
                        const fileUrl = await getDownloadURL(fileRef.ref)
                        res(fileUrl)
                    } catch (err) {
                        rej(err.message)
                    }
                })
            });

            Promise.all(filesUrl).then(async (imgUrls) => {
                const docRef = doc(firestore, "todos", params.id)

                await setDoc(docRef, {
                    images: [...images, ...imgUrls],
                }, {
                    merge: true,
                })

            })

        } catch (err) {
            setImageLoading(false)
            setError(err.message)
        }
    }

    return { updateImages }
} 