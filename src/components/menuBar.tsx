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
import UserAccountModal from './modals/userAccount';
import AccountSettingsModal from './modals/accountSettings';


const pages: string[] = [''];
const settings: string[] = ['Dados da conta', 'Configurações' , 'Sair'];

import { Style, UserName } from './styles';

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

    const closeUsernameAndPasswordModal = () => {
        setOpenUsernameAndPasswordModal(false)
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
                    {user.name}
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, pl: 1 }}>
                            <Avatar alt="user avatar" src={user && user.picture ? `data:image/jpeg;base64,${user.picture}` : ''} />
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
            <UserAccountModal open={openUserAccountModal} close={closeUserAccountModal} />

            {/* Modal para atualizar nome de usuário e senha */}
            <AccountSettingsModal open={openUsernameAndPasswordModal} close={closeUsernameAndPasswordModal} />
        </AppBar>
    );
}
export default ResponsiveAppBar;