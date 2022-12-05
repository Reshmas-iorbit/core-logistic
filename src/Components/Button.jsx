import { Button } from '@mui/material';
import React from 'react';

const Buttons = ({ formDetails, showData,aev  }) => {  
    console.log(aev,"aev from button");
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
        { aev != 'edit' ? formDetails.label : "Save"}
    </Button>
    )
}

export default Buttons