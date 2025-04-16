import React, { useState } from 'react';
import { login } from '../Api/mockApi';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
} from '@mui/material';
import '../styles.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            onLogin(response.token);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <Box className="login-background">
            <Paper className="login-card" elevation={6}>
                <Typography variant="h5" className="login-title">
                    Login
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="none"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <Typography color="error" variant="body2" mt={1}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        className="login-button"
                    >
                        Sign in
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;
