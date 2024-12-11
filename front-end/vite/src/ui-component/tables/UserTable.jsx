import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ users }) => {
    const navigate = useNavigate();

    const handleClick = (userId) => {
        navigate(`/user/update/${userId}`);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Ativo</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell> {user.name} </TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.isActive ? 'Ativo' : 'Inativo'}</TableCell>
                            <TableCell>
                                <IconButton aria-label="Edit" onClick={() => handleClick(user.id)}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

UserTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired
        })
    ).isRequired
};

export default UserTable;
