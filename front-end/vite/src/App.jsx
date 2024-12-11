import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { UserProvider } from 'context/user/UserContext';
import { NotificationProvider } from 'context/notification/NotificationContext';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <NotificationProvider>
            <UserProvider>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={themes(customization)}>
                        <CssBaseline />
                        <NavigationScroll>
                            <RouterProvider router={router} />
                        </NavigationScroll>
                    </ThemeProvider>
                </StyledEngineProvider>
            </UserProvider>
        </NotificationProvider>
    );
};

export default App;
