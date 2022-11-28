import { serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { addDocument } from '../../hooks/useDocument'

export const Create = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const dataToUpload = {
                title: title,
                description: description,
                date: new Date(date),
                isCompleted: false,
            }
            addDocument("todos", dataToUpload)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="home__create">
            <input className='home__create-input' value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Заголовок' />
            <input className='home__create-input' value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Описание' />
            <input className='home__create-input' value={date} onChange={(e) => setDate(e.target.value)} type="date" />
            <button disabled={loading} type='submit' style={{ marginTop: "20px" }}>Создать</button>
        </form>
    )
}
