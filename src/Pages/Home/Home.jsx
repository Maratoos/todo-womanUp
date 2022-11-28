import React from 'react'
import { Create } from '../../components/Create/Create'
import { Todos } from '../../components/Todos/Todos'
import "./style.css"

export const Home = () => {
    return (
        <div className="home">
            <Todos />
            <Create />
        </div>
    )
}
