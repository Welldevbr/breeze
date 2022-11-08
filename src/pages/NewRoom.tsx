import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from'react'

import illustration from '../assets/Illustration.svg'
import logo from '../assets/Logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { database, firebase } from '../services/firebase'


export function NewRoom() {
  const navigate =useNavigate()
  const { user } = useAuth()

  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()

    if (newRoom.trim() == '') {
      return
    }

    const roomRef = database.ref('rooms')
    
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/admin/rooms/${firebaseRoom.key}`)
  }
  

  return (
    <div id='page-auth'>
      <aside>
          <img src={illustration} alt="ilustração sobre perguntas e respostas" />
          <strong>
            Toda pergunta tem <br />
            uma resposta.
          </strong>
          <p>
              Tire as dúvidas de sua conferência ou reunião<br />
              em tempo-real.
          </p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logo} alt="logo letmeask" />
          <h2>
            Crie uma nova sala
          </h2>
          <form onSubmit={ handleCreateRoom }>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">
                Criar sala
            </Button>
            <p>
              Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}