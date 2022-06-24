import React, { useState } from 'react'
import auth from '../../auth';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { encode } from 'base-64';
import axios from 'axios';

const Login = (props) => {

    const defaultUsername = ""
    const defaultPassword = ""
    const defaultIsLoggingin = false
    const defaultShowPassword = false

    const [username, setUsername] = useState(defaultUsername)
    const [password, setPassword] = useState(defaultPassword)
    const [isLoggingin, setIsLoggingin] = useState(defaultIsLoggingin)
    const [showPassword, setShowPassword] = useState(defaultShowPassword)

    const navigate = useNavigate();


    const onLogin = () => {
        setIsLoggingin(defaultIsLoggingin);
        var credentials = username + ":" + password;
        var encodedString = encode(credentials);

        var data = JSON.stringify({
            "encoded_auth": encodedString
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/auth',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                navigate('/home');
                setIsLoggingin(defaultIsLoggingin)
            })
            .catch(function (error) {
                setIsLoggingin(defaultIsLoggingin)
                console.log(error);
            });
    }

    return (
        <div>
            <Grid container padding={5}>
                <Grid container direction="row" alignItems="center" padding={1}>
                    <Grid item xs={12}>
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            fullWidth={true}
                            onChange={(event) => { setUsername(event.target.value) }}
                        />
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" padding={1}>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            color="primary"
                            variant="outlined"
                            fullWidth={true}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => { setShowPassword(!showPassword) }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" padding={1}>
                    <Grid item xs={12}>
                        <LoadingButton
                            loading={isLoggingin}
                            loadingPosition="end"
                            endIcon={<LoginIcon />}
                            fullWidth={true}
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                setIsLoggingin(!isLoggingin);
                                auth.login(() => {
                                    onLogin()
                                })
                            }}
                        >
                            Login
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login