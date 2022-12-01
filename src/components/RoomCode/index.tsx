import toast, { Toaster } from 'react-hot-toast';

import copy from '../../assets/Copy.svg'

import './styles.scss'

type RoomCodeProps ={
  code: string | any;
}

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard () {
    toast.success('Código copiado com sucesso', {
        duration: 2000,
        position: 'top-center',
        
        //* Style
        style: {
          border: '1px solid #52b69a',
          background: 'rgba( 255, 255, 255, 0.35 )',
          backdropFilter: 'blur(13.5px)',
          WebkitBackdropFilter: 'blur(13.5px)',
        }
    });

    navigator.clipboard.writeText(props.code)
  }

  return (
    <div>
      <button onClick={copyRoomCodeToClipboard} className="room-code">
      
        <div>
          <img src={ copy } alt="copy" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
      <Toaster
        position="top-right"
      />
    </div>
  )
}