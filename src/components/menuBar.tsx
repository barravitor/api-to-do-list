import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { useRouter } from 'next/navigation';
import { IUser } from '../models/user';

const pages: string[] = [''];
const settings: string[] = ['Dados da conta', 'Configurações' , 'Sair'];

import { Style } from './styles';

function ResponsiveAppBar() {
    const router = useRouter();
    const user: IUser = JSON.parse(localStorage.getItem('user') || '{}') as IUser;
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [openUserAccountModal, setOpenUserAccountModal] = React.useState<boolean>(false);
    const [openUsernameAndPasswordModal, setOpenUsernameAndPasswordModal] = React.useState<boolean>(false);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const actionMenu = (action: string) => {
        if (action === 'Sair') {
            localStorage.clear();
            router.push('/auth/signin');
            return;
        }

        if (action === 'Dados da conta') {
            setOpenUserAccountModal(true);
        }

        if (action === 'Configurações') {
            setOpenUsernameAndPasswordModal(true);
        }


        handleCloseUserMenu();
    }

    const closeUserAccountModal = () => {
        setOpenUserAccountModal(false)
    }

    const postUpdateUser = () => {
        console.log('Atualizou');
        setOpenUserAccountModal(false);
    }

    const postDeleteUser = () => {
        console.log('Deletou');
        setOpenUserAccountModal(false);
    }

    const closeUsernameAndPasswordModal = () => {
        setOpenUsernameAndPasswordModal(false)
    }

    const postUpdateUsernameAndPassword = () => {
        console.log('Alterou usuário e senha');
        setOpenUsernameAndPasswordModal(false);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    TO DO LIST
                </Typography>

                {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box> */}

                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    TO DO LIST
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.length ? pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    )) : null}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="user avatar" src={user && user.picture ? user.picture : ''} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => actionMenu(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
            </Container>

            {/* Modal para atualizar os dados de usuário */}
            <Modal
                open={openUserAccountModal}
                onClose={closeUserAccountModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                        Atualizar dados de usuário
                    </Typography>
                    {/* <TextField label="Nome da task" sx={{ m: 1, width: '90%' }} id="outlined-basic-name" variant="outlined" type="text" value={taskName} onChange={(e) => { setTaskName(e.target.value); clearMessage() }}></TextField> */}

                    <Button variant="contained" sx={{ width: '90%', marginTop: '10px', marginBottom: '5px' }} onClick={postUpdateUser}>
                        Atualizar
                    </Button>

                    <Button variant="contained" sx={{ width: '90%', marginTop: '15px', marginBottom: '5px' }} onClick={postDeleteUser}>
                        Deletar usuário
                    </Button>
                </Box>
            </Modal>

            {/* Modal para atualizar usuário e senha */}
            <Modal
                open={openUsernameAndPasswordModal}
                onClose={closeUsernameAndPasswordModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={Style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign: 'center'}}>
                        Atualizar usuário e senha
                    </Typography>
                    {/* <TextField label="Nome da task" sx={{ m: 1, width: '90%' }} id="outlined-basic-name" variant="outlined" type="text" value={taskName} onChange={(e) => { setTaskName(e.target.value); clearMessage() }}></TextField> */}

                    <Button variant="contained" sx={{ width: '90%', marginTop: '10px', marginBottom: '5px' }} onClick={postUpdateUsernameAndPassword}>
                        Atualizar
                    </Button>
                </Box>
            </Modal>
        </AppBar>
    );
}
export default ResponsiveAppBar;