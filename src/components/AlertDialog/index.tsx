import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Closed from '../../assets/Closed.svg'
import './styles.scss'

import { forwardRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});


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
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
          <DialogContentText 
            textAlign={"center"}
            id="alert-dialog-description"
            style={
              {
                padding: "1rem",
                margin: "2rem 15rem",
                fontSize: "1.6rem",
                fontFamily: "Poppins",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem"
              }
            }
          >   

              <img src={Closed} alt="closed" className="img-closed"/>

              <div className="text-modal">
                <strong>Encerrar Sala</strong>

                <p>
                  Tem certeza que você deseja
                  encerrar esta sala?
                </p>
              </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={
            {
              padding: "10px", 
              marginBottom: "20px",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: "1rem"
            }
          }
        >
          <Button
            variant="contained"
            className="button-modal"
            style={
              {
                background: "#DBDCDD",
                color: "#737380", 
                font: "700 1.8rem Roboto",
                textTransform: "lowercase",
                padding: "1.9rem 6.4rem",
                borderRadius: "8px",
              }
            } 
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className="button-modal"
            style={
              {
                background: "#E73F5D",
                color: "#fff", 
                font: "700 1.8rem Roboto",
                textTransform: "lowercase",
                padding: "1.9rem 5.5rem",
                borderRadius: "8px",
              }
            }  
            onClick={handleEndRoom} 
            autoFocus
          >
            Sim, encerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}