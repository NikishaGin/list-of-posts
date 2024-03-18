import React from 'react';
import {CircularProgress, Stack} from "@mui/material";

export const MyLoading = () => {
    return (
        <div>
            <Stack sx={{color: 'grey.500',  alignItems: 'center',
                justifyContent: 'center', display: 'flex', marginTop: '50px'}} spacing={2} direction="row">
                <CircularProgress color="secondary"/>
            </Stack>
        </div>
    );
};

