import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { useRouter } from 'next/navigation';
import { IUser } from '../../models/user';

import { Style, BoxLeft, BoxRigth, Container, MessageErrorContainer, MessageError } from './styles';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
    open: boolean;
    close: any
}

const UserAccountModal = ({ open, close }: Props) => {
    const router = useRouter();
    const user: IUser = JSON.parse(localStorage.getItem('user') || '{}') as IUser;

    const [name, setName] = React.useState<string>(user.name || '');
    const [email, setEmail] = React.useState<string>(user.email || '');
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [picture, setPicture] = React.useState<any>(user.picture || '');
    const [message, setMessage] = React.useState({
        title: '',
        description: ''
    });

    const onChange = (e: any) => {
        let file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded
            reader.readAsBinaryString(file)
        }
    }
    
    const _handleReaderLoaded = (readerEvt: any) => {
        let binaryString = readerEvt.target.result;
        setPicture(btoa(binaryString));
    }

    const postUpdateUser = async (e: any) => {
        e.preventDefault();

        if (username !== user.username) {
            setMessage({
                title: 'Erro ao atualizar os dados do usuário',
                description: 'Incorrect username and/or password'
            });
            return;
        }

        let res = await fetch("https://todolist-api.edsonmelo.com.br/api/user/update/", {
            method: 'PUT',
            body: JSON.stringify({
                "name": name,
                "email": email,
                "username": username,
                "password": password,
                "picture": picture
            }),
            headers: {
                'content-type': 'application/json',
                'Authorization': user.token || ''
            }
        });
    
        let resJson = await res.json();

        if (resJson.message === 'User Successfully Updated') {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify({
                    "id": user.id,
                    "username": username,
                    "name": name,
                    "email": email,
                    "token": user.token,
                    "picture": picture
                }));

                close();
            }
        } else {
            setMessage({
                title: 'Erro ao atualizar os dados do usuário',
                description: resJson.message
            });
        }
    }

    const postDeleteUser = async (e: any) => {
        e.preventDefault();

        if (username !== user.username) {
            setMessage({
                title: 'Erro para deletar usuário',
                description: 'Incorrect username and/or password'
            });
            return;
        }

        let res = await fetch("https://todolist-api.edsonmelo.com.br/api/user/delete/", {
            method: 'DELETE',
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
            headers: {
                'content-type': 'application/json',
                'Authorization': user.token || ''
            }
        });
    
        let resJson = await res.json();

        if (resJson.message === 'User Successfully Deleted') {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                router.push('/auth/signin');
            }
        } else {
            setMessage({
                title: 'Erro para deletar usuário',
                description: resJson.message
            });
        }
    }

    const [file, setFile] = React.useState<string>();
    const [imagePreview, setImagePreview] = React.useState<any>("");
    const [base64, setBase64] = React.useState<string>();
    const [fileName, setFileName] = React.useState<string>();
    const [size, setSize] = React.useState<string>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const photoUpload = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setFile(file)
                setSize(file.size);
                setFileName(file.name)
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file);

            onChange(e);
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                    Atualizar dados de usuário
                </Typography>

                <Box sx={Container}>
                    <Box sx={BoxLeft}>
                        <Avatar alt="user avatar" sx={{ m: 1, width: '50%', height: '50%' }} src={`data:image/jpeg;base64,${picture}`}  />
                        <input type="file" name="photo" accept=".jpef, .png, .jpg" onChange={onChange} />
                    </Box>

                    <Box sx={BoxRigth}>
                        <TextField label="Nome" sx={{ m: 1, width: '90%' }} id="outlined-basic-name" variant="outlined" type="text" value={name} onChange={(e) => { setName(e.target.value); clearMessage() }}></TextField>

                        <TextField label="Email" sx={{ m: 1, width: '90%' }} id="outlined-basic-email" variant="outlined" type="text" value={email} onChange={(e) => { setEmail(e.target.value); clearMessage() }}></TextField>

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
                    </Box>
                </Box>

                <Button variant="contained" sx={{ width: '90%', marginTop: '20px', marginBottom: '5px' }} onClick={postUpdateUser}>
                    Atualizar
                </Button>

                <Button variant="contained" color="error" sx={{ width: '90%', marginTop: '15px', marginBottom: '5px' }} onClick={postDeleteUser}>
                    Deletar usuário
                </Button>

                <MessageErrorContainer> 
                    {message && message.title ? (<MessageError>{message.title}</MessageError>) : ''}
                    {message && message.description ? (<MessageError>{message.description}</MessageError>) : ''}
                </MessageErrorContainer>
            </Box>
        </Modal>
    );
}

export default UserAccountModal;