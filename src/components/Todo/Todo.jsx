import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { dueDate } from '../../helpers/date'
import { getCollection } from '../../hooks/getCollection'
import { deleteDocument } from '../../hooks/useDocument'
import { useStorage } from '../../hooks/useStorage'
import './style.css'

export const Todo = () => {
  const { documents, isLoading } = getCollection("todos")
  const { updateImages, imageLoading } = useStorage()
  const params = useParams()
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [validate, setValidate] = useState("")
  const [changeDoc, setChangeDoc] = useState(false)
  const [newTitle, setNewTitle] = useState()
  const [newDescription, setNewDescription] = useState()
  const [newDate, setNewDate] = useState()

  const handleUpdateImages = async () => {
    let currArr = documents.filter(todo => todo.id === params.id)[0]?.images
    if (!files.length) setValidate("Выберите картинку")
    if (files.length > 5) setValidate("Выберите до 5 файлов")
    if (files.length <= 5) {
      await updateImages(files, currArr)
    }
  }

  const handleFilesChange = (e) => {
    setFiles([...e.target.files])
  }

  const handleDeleteDocument = () => {
    deleteDocument(params.id)
    navigate("/")
  }

  const handleUpdateDocument = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      title: newTitle ?? todo.title,
      description: newDescription ?? todo.description,
      date: new Date(newDate) ?? todo.date
    })
  }

  return (
    <>
      {isLoading && <p className='loading'>Загрузка...</p>}
      <Link to="/" className="back">На главную</Link>
      {documents.length > 0 &&
        documents.map((todo) => todo.id === params.id ? (
          <div key={todo.id} className='todo'>
            {changeDoc ?
              <input type="text" defaultValue={todo.title} onChange={(e) => setNewTitle(e.target.value)} />
              :
              <h1 className='todo__title'>{todo.title}</h1>
            }
            <div className='todo__description'>
              {changeDoc ?
                <>
                  <input type="text" defaultValue={todo.description} onChange={(e) => setNewDescription(e.target.value)} />
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                </>
                :
                <>
                  <p>{todo.description}</p>
                  <span>Cрок:{dueDate(todo.date.toDate())}</span>
                </>
              }
            </div>
            <div className="todo__middle">
              <div className="todo__images">
                {todo.images && todo.images.length > 0 ?
                  todo.images.map(image => (
                    <img key={image + Math.random() * 0.5} className='todo__image' src={image} alt="" />
                  )) : (
                    null
                  )}
              </div>
              <div className="add-more-photos">
                <input onChange={handleFilesChange} type="file" multiple />
                <button onClick={handleUpdateImages} type="submit" disabled={imageLoading} >Добавить новые фото?</button>
                {validate && validate}
              </div>
            </div>
            <div className="change-delete__holder">
              <div className="todo__change" onClick={() => setChangeDoc(prev => !prev)}>
                <div style={{ display: "flex" }}>
                  <p>Редактировать поля</p>
                  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" />
                  </svg>
                </div>
                {changeDoc && <button onClick={() => handleUpdateDocument(todo)}>Сохранить</button>}
              </div>
              <div className="todo__delete" onClick={handleDeleteDocument}>
                <p>Удалить задачу</p>
                <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.25 2.75C6.25 1.36929 7.36929 0.25 8.75 0.25H13.25C14.6307 0.25 15.75 1.36929 15.75 2.75V3.25H20.75C21.3023 3.25 21.75 3.69772 21.75 4.25C21.75 4.80228 21.3023 5.25 20.75 5.25H19.5V17.75C19.5 19.9591 17.7091 21.75 15.5 21.75H6.5C4.29086 21.75 2.5 19.9591 2.5 17.75V5.25H1.25C0.697715 5.25 0.25 4.80228 0.25 4.25C0.25 3.69772 0.697715 3.25 1.25 3.25H6.25V2.75ZM8.25 3.25H13.75V2.75C13.75 2.47386 13.5261 2.25 13.25 2.25H8.75C8.47386 2.25 8.25 2.47386 8.25 2.75V3.25ZM4.5 5.25V17.75C4.5 18.8546 5.39543 19.75 6.5 19.75H15.5C16.6046 19.75 17.5 18.8546 17.5 17.75V5.25H4.5ZM11 7C11.5523 7 12 7.44772 12 8L12 17C12 17.5523 11.5523 18 11 18C10.4477 18 10 17.5523 10 17L10 8C10 7.44772 10.4477 7 11 7Z" fill="#1E212C" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          null
        ))
      }
    </>
  )
}
