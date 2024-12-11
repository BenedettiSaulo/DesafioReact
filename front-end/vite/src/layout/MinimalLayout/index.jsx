import { Outlet } from 'react-router-dom';

// project imports
import { Box } from '@mui/system';
import { AppBar, CssBaseline, styled, Toolbar, useTheme } from '@mui/material';
import Header from './Header';
import { useSelector } from 'react-redux';
import { IconChevronRight } from '@tabler/icons-react';
import { drawerWidth } from 'store/constant';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen
              }
            : {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen
              }
    ),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px'
    }
}));

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
    const theme = useTheme();
    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Header />
                </Toolbar>
            </AppBar>

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                {/* breadcrumb */}
                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                <Outlet />
            </Main>
        </Box>
    );
};

export default MinimalLayout;
