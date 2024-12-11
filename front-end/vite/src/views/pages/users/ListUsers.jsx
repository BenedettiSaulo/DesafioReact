import { Button } from '@mui/material';
import { useUserContext } from 'context/user/UserContext';
import { useNavigate } from 'react-router-dom';
import UserTable from 'ui-component/tables/UserTable';

const ListUsers = () => {
    const navigate = useNavigate();
    const { users } = useUserContext();

    const handleClick = () => {
        navigate('/user/create');
    };

    return (
        <>
            <Button variant="contained" onClick={handleClick} sx={{ marginBottom: '20px' }}>
                Adicionar usuário
            </Button>
            <UserTable users={users} />
        </>
    );
};

export default ListUsers;
