import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const alterUser = (updatedUser) => {
        setUsers((prevUsers) => {
            const userIndex = prevUsers.findIndex((user) => user.id === updatedUser.id);

            if (userIndex !== -1) {
                const updatedUsers = [...prevUsers];
                updatedUsers[userIndex] = updatedUser;
                return updatedUsers;
            }

            return prevUsers;
        });
    };

    const activeUserLimit = useMemo(() => {
        if (!users) {
            return false;
        }

        const activeUsers = users.filter((user) => user.isActive);

        return activeUsers.length >= 5;
    }, [users]);

    return <UserContext.Provider value={{ users, setUsers, alterUser, activeUserLimit }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useUserContext = () => useContext(UserContext);
