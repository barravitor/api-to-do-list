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
import { useRouter } from 'next/navigation';

import { LoginContainer } from './styles';
import { MessageError, MessageErrorContainer, Page, Title, BtnRedirect } from '../styles';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState({
    title: '',
    description: ''
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setMessage({
          title: 'As senhas não são iguais',
          description: ''
        });
        return;
      }

      let res = await fetch("https://todolist-api.edsonmelo.com.br/api/user/new/", {
        method: "POST",
        body: JSON.stringify({
          "name": name,
          "email": email,
          "username": username,
          "password": password
        }),
        headers: {
          "content-type": "application/json"
        }
      });

      let resJson = await res.json();

      if (!resJson || !resJson.message) {
        setMessage({
          title: 'Erro interno no servidor!',
          description: ''
        });
        return;
      }

      if (resJson.message === 'User Successfully Added') {
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify({
            "id": resJson.id,
            "name": name,
            "email": email,
            "token": resJson.token
          }));
          router.push("/");
        }

      } else {
        setMessage({
          title: 'Erro ao cadastrar o usuário',
          description: resJson.message
        });
      }
    } catch (err) {}
  };

  const clearMessage = () => {
    setMessage({
      title: '',
      description: ''
    })
  }

  const redirectTo = (route: string) => {
    if (typeof window !== 'undefined') {
      router.push(route);
    }
  }

  return (
    <Page>
      <LoginContainer>
        <Title>Cadastro</Title>
        <TextField label="Nome completo" sx={{ m: 1, width: '400px' }} id="outlined-basic-name" variant="outlined" type="text" value={name} onChange={(e) => { setName(e.target.value); clearMessage() }}></TextField>
        <TextField label="Username" sx={{ m: 1, width: '400px' }} id="outlined-basic-username" variant="outlined" type="text" value={username} onChange={(e) => {setUsername(e.target.value); clearMessage()}}></TextField>
        <TextField label="Email" sx={{ m: 1, width: '400px' }} id="outlined-basic-email" variant="outlined" type="email" value={email} onChange={(e) => {setEmail(e.target.value); clearMessage()}}></TextField>
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

        <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirm-password">Confirmar a Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value); clearMessage()}}
            label="Password"
          />
        </FormControl>

        <Button variant="contained" sx={{ width: '400px', }} type="submit" onClick={handleSubmit}>Cadastrar</Button>
        <BtnRedirect>
          <Button sx={{ fontSize: '11px' }} variant="text" onClick={() => redirectTo('/auth/signin')}>
            Clique aqui para se logar
          </Button>
        </BtnRedirect>

        <MessageErrorContainer> 
          {message && message.title ? (<MessageError>{message.title}</MessageError>) : ''}
          {message && message.description ? (<MessageError>{message.description}</MessageError>) : ''}
        </MessageErrorContainer>
      </LoginContainer>
    </Page>
  );
}