import toast, { Toaster } from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom'

import logo from '../../../assets/Logo.svg'
import illustration from '../../../assets/Icon-Chat.svg'

import { Button } from '../../../components/Button'
import { RoomCode } from '../../../components/RoomCode'

import { useAuth } from '../../../hooks/useAuth';
import { useRoom } from '../../../hooks/useRoom'

import './styles.scss'

import { Question } from '../../../components/Question';
import { database } from '../../../services/firebase';


type RoomParams = {
  id: string;
}

export function AdminRoom()  {
  const navigate = useNavigate();

  const { user } = useAuth()


  const params = useParams<RoomParams>()
  const roomId: string | any = params.id

  const { questions, title } = useRoom( roomId )

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    navigate('/')
  }

  async function handleCheckeQuestionAsAnswered(questionId: string){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
      })
  }
  
  async function handleHighlightQuestion(questionId: string){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighLighted: true,
      })
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Você realmente deseja excluir esta pergunta?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      toast.success('Pergunta excluida com sucesso.')
    }
  }
  

  return (
    <div id="page-room-admin">
      <header>
        <div className="content">
          <img src={logo} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala:  {title}</h1>
            { 
              questions.length >  0 && <span>{ questions.length } pergunta(s)</span>
            }
        </div>

        <div className="question-list">
        {
          questions.length >  0 ? (
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content} 
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighLighted={question.isHighLighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button 
                        type='button' 
                        className='check-button'
                        onClick={() => handleCheckeQuestionAsAnswered(question.id)}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="10.0003" cy="10.0002" r="9.00375" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.44287 10.3394L8.61077 12.5073L8.59677 12.4933L13.4878 7.60229" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
 
                      </button>

                      <button 
                        type='button' 
                        className='answer-button'
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.0002H16C17.657 15.0002 19 13.6572 19 12.0002V4.00024C19 2.34324 17.657 1.00024 16 1.00024H4C2.343 1.00024 1 2.34324 1 4.00024V12.0002C1 13.6572 2.343 15.0002 4 15.0002H5.5V18.0002L10 15.0002Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                      </button>
                    </>
                  )}

                  <button 
                    type='button' 
                    className='delete-button'
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5H3H19" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6 5V3C6 2.46957 6.21071 1.96086 6.58579 1.58579C6.96086 1.21071 7.46957 1 8 1H12C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V5M17 5V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5H17Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                 
                </Question>
              )
            })
          ):(
            <div className='not-questions'>
              <img src={ illustration } alt="" />
              <strong>
                Nenhuma pergunta por aqui...
              </strong>
              <span>
                Envie o código desta sala para os participantes e <br /> 
                comece a responder perguntas!
              </span>
            </div>
          )
        }
        </div>
      </main>
    </div>
  )
}