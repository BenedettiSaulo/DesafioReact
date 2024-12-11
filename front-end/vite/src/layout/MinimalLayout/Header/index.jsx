import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project imports
import SearchSection from './SearchSection';

// assets
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ==============================|| MINIMAL NAVBAR / HEADER ||============================== //

const Header = () => {
    const [isMain, setIsMain] = useState(false);
    const [title, setTitle] = useState('');

    const theme = useTheme();
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/user/create':
                setTitle('Cadastrar Usuário');
                setIsMain(false);
                break;
            case '/user/update':
                setTitle('Atualizar Usuário');
                setIsMain(false);
                break;
            default:
                setTitle('Lista de Usuários');
                setIsMain(true);
                break;
        }
    }, [location.pathname]);

    return (
        <>
            {/* Title */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <h2>{title}</h2>
                </Box>
            </Box>

            {/* header search */}
            {isMain && <SearchSection />}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
