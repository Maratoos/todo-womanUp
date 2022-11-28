import { doc, setDoc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { db, firestore } from '../../firebase/config'
import { dueDate } from '../../helpers/date'
import { getCollection } from '../../hooks/getCollection'
import './style.css'

export const Todos = () => {
  const { documents, isLoading } = getCollection("todos")

  const numOfPictures = (arr) => {
    return !arr ? "Вложений нет" : "Есть вложения"
  }

  const handleSetIsCompleted = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted
    })
  }

  return (
    <div className="todo__board">
      {isLoading && <p className='loading'>Загрузка...</p>}
      {documents.length > 0 &&
        documents.map((todo) => (
          <div style={{background: `${todo.isCompleted ? "green" : "red"}`}} key={todo.id} className="todo__board-todo">
            <div className='todo__board-todo-top'>
              <h2>{todo.title}</h2>
              <span>{dueDate(todo.date.toDate())}</span>
            </div>
            <div className='todo__board-todo-middle'>
              <p>{todo.description.slice(0, 20)}...</p>
              <span>{numOfPictures(todo?.images)}</span>
            </div>
            <div>
              <Link to={`/todos/${todo.id}`} className="link">Показать больше?</Link>
            </div>
            <button className='completed' onClick={() => handleSetIsCompleted(todo)}>{todo.isCompleted ? "Отменить завершение" : "Завершить"}</button>
          </div>
        ))
      }
      {!documents && <p className='loading'>Задач еще нет</p>}
    </div>
  )
}
