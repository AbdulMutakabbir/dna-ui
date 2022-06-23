import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const PageLanding = (props) => {
    return (
        <>
            <Typography align='center' variant="h1" mt={5}>Carleton ITS</Typography>
            <Typography align='center' variant="subtitle1">Welcome to to carleton ITS! Please login to proceed further...</Typography>

            <Typography align='center' mt={5}>
                <Link href="/login">Got to login...</Link>
            </Typography>
        </>
    )
}

export default PageLanding