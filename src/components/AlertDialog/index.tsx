import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
}

export function AlertDialog() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const params = useParams<RoomParams>()
  const roomId: string | any = params.id


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    navigate('/')
  }

  return (
    <div>
      <Button 
        variant="outlined" 
        style={
          {
            border: "1px solid #0052a3",
            borderRadius: "8px",
            color: "#0052a3",
            font: "400 1.4rem Roboto",
            textTransform: "capitalize",
          }
        } 
        onClick={handleClickOpen}
      >
        Encerrar Sala
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{display: "flex", justifyContent: "center"}}>
          <DialogContentText 
            textAlign={"center"}
            id="alert-dialog-description"
            style={
              {
                padding: "20px",
                margin: "40px",
                fontSize: "2rem",
              }
            }
          >
              Você realmente deseja <br />
              encerrar esta sala?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{marginInline: "8px"}}>
          <Button 
            style={
              {
                color: "#e7405f", 
                font: "700 1.6rem Roboto",
                textTransform: "capitalize",
              }
            } 
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button 
            style={
              {
                color: "#06d6a0", 
                font: "700 1.6rem Roboto",
                textTransform: "capitalize",
              }
            }  
            onClick={handleEndRoom} 
            autoFocus
          >
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}