import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import SimpleAlert from 'ui-component/alerts/SimpleAlert';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (severity, message, duration = 3000) => {
        setNotification({ severity, message });

        setTimeout(() => setNotification(null), duration);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        padding: '16px',
                        textAlign: 'center',
                        justifyItems: 'center'
                    }}
                >
                    <SimpleAlert severity={notification.severity} message={notification.message} />
                </div>
            )}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useNotification = () => useContext(NotificationContext);
