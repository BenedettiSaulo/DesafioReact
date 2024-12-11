import { Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useUserContext } from 'context/user/UserContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from 'context/notification/NotificationContext';
import { updateUser } from 'services/UserService';
import Loader from 'ui-component/Loader';
import InputMask from 'react-input-mask';

const UpdateUser = () => {
    const { userId } = useParams();
    const { users, activeUserLimit, alterUser } = useUserContext();
    const { showNotification } = useNotification();

    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [alreadyActiveUser, setAlreadyActiveUser] = useState(false);
    const [permissionLevel, setPermissionLevel] = useState(1);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    const handlePermissionChange = (event) => {
        const value = Number(event.target.value);
        setPermissionLevel(value);
    };

    const handleClick = () => {
        navigate('/');
    };

    const userIdParsed = parseInt(userId, 10);

    useEffect(() => {
        if (users && users.length > 0) {
            const foundUser = users.find((user) => user.id === userIdParsed);
            if (foundUser) {
                setLoading(false);
                setImage(foundUser.image || '');
                setImagePreview(`data:image/jpeg;base64,${foundUser.image}` || '');
                setName(foundUser.name || '');
                setPhone(foundUser.phone || '');
                setEmail(foundUser.email || '');
                setUsername(foundUser.username || '');
                setPassword(foundUser.password || '');
                setIsActive(foundUser.isActive);
                setPermissionLevel(foundUser.permissionLevel || 1);

                if (foundUser.isActive) {
                    setAlreadyActiveUser(true);
                }
            }
        }
    }, [users, userIdParsed]);

    if (loading) {
        return <Loader />;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
                setImage(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (validateForm()) {
            console.log('Formulário válido! Enviar dados...');

            try {
                const userUpdated = {
                    id: userIdParsed,
                    image: image,
                    name: name,
                    email: email,
                    username: username,
                    password: password,
                    phone: phone,
                    isActive: isActive,
                    permissionLevel: permissionLevel
                };

                await updateUser(userUpdated);

                alterUser(userUpdated);

                navigate('/');

                showNotification('success', 'Usuário alterado com sucesso!');
            } catch (err) {
                console.log(`Error. ${err}`);

                showNotification('error', 'Usuário alterado com sucesso!');
            }
        } else {
            console.log('Formulário inválido!');

            showNotification('warning', 'Formulário inválido! Preencha os campos obrigatórios.');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (isActive && !alreadyActiveUser && activeUserLimit) newErrors.isActive = 'Limite de usuários ativos atingido';
        if (!name.trim()) newErrors.name = 'Nome é obrigatório';
        if (!email.trim()) newErrors.email = 'E-mail é obrigatório';
        if (email.trim() && !validateEmail(email)) newErrors.email = 'E-mail inválido';
        if (!username.trim()) newErrors.username = 'Username é obrigatório';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 85.52px - 36.5px - 19.75px)',
                padding: '20px',
                backgroundColor: '#FFF'
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', paddingBottom: '20px' }}>
                            Adicionar imagem de perfil
                        </Typography>
                        <Box
                            sx={{
                                border: '1px dashed gray',
                                height: '250px',
                                width: '250px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                backgroundImage: image ? `url(${imagePreview})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => document.getElementById('upload-image').click()}
                        >
                            {!image ? (
                                <>
                                    <Typography variant="body1" color="textSecondary">
                                        Insira uma imagem
                                    </Typography>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        id="upload-image"
                                    />
                                </>
                            ) : (
                                <input
                                    accept="image/*"
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    id="upload-image"
                                />
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={isActive}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setIsActive(checked);

                                                    if (!checked) {
                                                        setErrors((prevErrors) => ({
                                                            ...prevErrors,
                                                            isActive: null
                                                        }));
                                                    }
                                                }}
                                                color="primary"
                                            />
                                        }
                                        label="Habilitar Usuário"
                                    />
                                    {errors.isActive && (
                                        <Typography variant="caption" color="error" sx={{ marginLeft: 2 }}>
                                            {errors.isActive}
                                        </Typography>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Nome *"
                                        variant="outlined"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        inputProps={{ minLength: 5, maxLength: 30 }}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputMask mask="(99) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)}>
                                        {(inputProps) => <TextField {...inputProps} fullWidth label="Telefone" variant="outlined" />}
                                    </InputMask>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="E-mail *"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </Grid>

                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        label="Username *"
                                        variant="outlined"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        inputProps={{ maxLength: 45 }}
                                        error={!!errors.username}
                                        helperText={errors.username}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Nível de Permissão *</InputLabel>
                                        <Select value={permissionLevel} onChange={handlePermissionChange} label="Nível de Permissão">
                                            <MenuItem value={1}>Usuário</MenuItem>
                                            <MenuItem value={2}>Administrador</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 4,
                    gap: 2
                }}
            >
                <Button variant="outlined" color="secondary" onClick={handleClick}>
                    Voltar
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Salvar
                </Button>
            </Box>
        </Box>
    );
};

export default UpdateUser;
