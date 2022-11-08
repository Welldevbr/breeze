import { useNavigate } from 'react-router-dom'

import illustration from '../assets/Illustration.svg'
import logo from '../assets/Logo.svg'

import { GoogleLogo, SignIn } from 'phosphor-react'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { FormEvent, useContext, useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { database } from '../services/firebase'

import toast, { Toaster } from 'react-hot-toast'


export function Home() {
  const navigate = useNavigate()
  const { user, signInWithGoogle } = useContext(AuthContext)
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
      if (!user){
        await signInWithGoogle()
      }
      navigate("/rooms/new") 
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (!user){
      await signInWithGoogle()
    }

    if (roomCode.trim() == '') {
      toast('Por favor digite o código da sala!', {
        icon: '😕',
      });
      return
    }
 
    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      toast.error('Esta sala não existe!');
      return;
    }

    if (roomRef.val().endedAt) {
      toast('Esta sala foi encerrada!', {
        icon: '😥',
      });
      return;
    }

    navigate(`/rooms/${roomCode}`)


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
            <button 
              onClick={handleCreateRoom} 
              className='create-room'>
              <GoogleLogo 
                className='icon'
                size={22} 
                weight="bold"
                color="#fff"
              />
              Crie sua sala com a Google
            </button>
          <small>
            ou entre em uma sala
          </small>
          <form onSubmit={ handleJoinRoom }>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              <SignIn 
                className='icon'
                size={22} 
                weight="bold" 
                color="#fff"
              />
              Entrar na sala
            </Button>
            <Toaster
              position="top-right"
            />
          </form>
        </div>
      </main>
    </div>
  )
}

function useRoom() {
  throw new Error('Function not implemented.')
}
