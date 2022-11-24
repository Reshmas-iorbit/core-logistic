import { Button } from '@mui/material';
import React from 'react';

const Buttons = ({ formDetails, showData  }) => {
    return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={showData}
    >
        {formDetails.label}
    </Button>
    )
}

export default Buttons