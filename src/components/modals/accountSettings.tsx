import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { IUser } from '../../models/user';

import { Style, MessageErrorContainer, MessageError } from './styles';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
    open: boolean;
    close: any
};

const AccountSettingsModal = ({ open, close }: Props) => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '{}') as IUser;

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [newUsername, setNewUsername] = React.useState<any>('');
    const [newPassword, setNewPassword] = React.useState<any>('');

    const [message, setMessage] = React.useState({
        title: '',
        description: ''
    });

    const postUpdateUserPass = async (e: any) => {
        e.preventDefault();

        if (username !== user.username) {
            setMessage({
                title: 'Erro para atualizar o nome de usuário e senha',
                description: 'Incorrect username and/or password'
            });
            return;
        }

        if (!newUsername || !newPassword) {
            setMessage({
                title: 'Erro para atualizar o nome de usuário e senha',
                description: 'Incorrect new username and/or new password'
            });
            return;
        }

        let res = await fetch("https://todolist-api.edsonmelo.com.br/api/user/updateuserpass/", {
            method: 'PUT',
            body: JSON.stringify({
                "username": username,
                "password": password,
                "new_username": newUsername,
                "new_password": newPassword 
            }),
            headers: {
                'content-type': 'application/json',
                'Authorization': user.token || ''
            }
        });
    
        let resJson = await res.json();

        if (resJson.message === 'Username/password Successfully Updated') {
            if (typeof window !== 'undefined') {
                user.username = newUsername;
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(user));
                close();
            }
        } else {
            setMessage({
                title: 'Erro para atualizar o nome de usuário e senha',
                description: resJson.message
            });
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const clearMessage = () => {
        setMessage({
            title: '',
            description: ''
        });
    }

    return (
        <Modal
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={Style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', marginBottom: '15px' }}>
                    Alterar username e senha
                </Typography>

                <TextField label="Username" sx={{ m: 1, width: '90%' }} id="outlined-basic-username" variant="outlined" type="text" value={username} onChange={(e) => { setUsername(e.target.value); clearMessage() }}></TextField>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
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
                
                <TextField label="Novo Username" sx={{ m: 1, width: '90%' }} id="outlined-basic-new-username" variant="outlined" type="text" value={newUsername} onChange={(e) => { setNewUsername(e.target.value); clearMessage() }}></TextField>
                <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-new-password">Nova Senha</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownNewPassword}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={newPassword}
                        onChange={(e) => {setNewPassword(e.target.value); clearMessage()}}
                        label="Password"
                    />
                </FormControl>

                <Button variant="contained" sx={{ width: '90%', marginTop: '20px', marginBottom: '5px' }} onClick={postUpdateUserPass}>
                    Atualizar
                </Button>

                <MessageErrorContainer> 
                    {message && message.title ? (<MessageError>{message.title}</MessageError>) : ''}
                    {message && message.description ? (<MessageError>{message.description}</MessageError>) : ''}
                </MessageErrorContainer>
            </Box>
        </Modal>
    );
}

export default AccountSettingsModal;