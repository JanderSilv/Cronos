import React, { ChangeEvent, FormEvent, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@material-ui/core'

interface Props {
  isOpen: boolean
  handleChangeName: (name: string) => void
}

const NameDialog = (props: Props): JSX.Element => {
  const { isOpen, handleChangeName } = props
  const [name, setName] = useState('')

  const handleName = (event: ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    localStorage.setItem('@Cronos:name', name)
    handleChangeName(name)
  }

  return (
    <Dialog
      open={isOpen}
      maxWidth="md"
      aria-labelledby="name-dialog-title"
      style={{ padding: '1rem' }}
    >
      <DialogTitle id="name-dialog-title">Bem Vindo ao Cronos.</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Seu lindo nome. "
            value={name}
            onChange={handleName}
            autoFocus
            fullWidth
          />
          <DialogActions style={{ marginTop: '1rem' }}>
            <Button variant="contained" color="primary" type="submit">
              Sim, este é meu lindo nome.
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NameDialog
