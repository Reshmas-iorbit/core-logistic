import { Button } from '@mui/material';
import React from 'react';

const Buttons = ({ formDetails, showData  }) => {
    if (formDetails.submitURL == null) {
        console.log("URL SJSSJS");
    }
    return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={formDetails.submitURL ? ()=>showData(formDetails.submitURL) : '' }
    >
        {formDetails.label}
    </Button>
    )
}

export default Buttons