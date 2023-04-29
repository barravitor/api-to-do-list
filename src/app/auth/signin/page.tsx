"use client"

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

import { LoginContainer } from './styles';
import { MessageError, MessageErrorContainer, Page, Title } from '../styles';

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState({
    title: '',
    description: ''
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    try {

      let res = await fetch("https://todolist-api.edsonmelo.com.br/api/user/login/", {
        method: "POST",
        body: JSON.stringify({
          "username": username,
          "password": password
        }),
        headers: {
          "content-type": "application/json"
        }
      });

      console.log(res);

      let resJson = await res.json();

      console.log('resJson', resJson)

      if (!resJson) {
        setMessage({
          title: 'Erro interno no servidor!',
          description: ''
        });
        return;
      }

      if (resJson.token) {
        localStorage.setItem('user', JSON.stringify(resJson));
        setMessage({
          title: 'Acesso liberado com sucesso!',
          description: ''
        });
      } else {
        setMessage({
          title: 'Erro no login',
          description: resJson.message
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearMessage = () => {
    setMessage({
      title: '',
      description: ''
    })
  }

  return (
    <Page>
      <LoginContainer>
        <Title>Login</Title>
        <TextField label="Username" sx={{ m: 1, width: '400px' }} id="outlined-basic-username" variant="outlined" type="text" value={username} onChange={(e) => {setUsername(e.target.value); clearMessage()}}></TextField>
        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={password}
            onChange={(e) => {setPassword(e.target.value); clearMessage()}}
            label="Password"
          />
        </FormControl>

        <Button variant="contained" sx={{ width: '400px', }} type="submit" onClick={handleSubmit}>Entrar</Button>

        <MessageErrorContainer> 
          {message && message.title ? (<MessageError>{message.title}</MessageError>) : ''}
          {message && message.description ? (<MessageError>{message.description}</MessageError>) : ''}
        </MessageErrorContainer>
      </LoginContainer>
    </Page>
  );
}