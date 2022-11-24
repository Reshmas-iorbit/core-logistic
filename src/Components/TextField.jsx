import { TextField } from '@mui/material'
import React from 'react'

const TextBox = ({ formDetails, onChange, inputDetails, editFlag }) => {
    return (
        <TextField
            id="outlined-read-only-input"
            required
            label={formDetails.id}
            fullWidth
            size='small'
            variant='outlined'
            onChange={onChange}
            name={formDetails.id}
            value={inputDetails[formDetails.id]}
            InputProps={{
                readOnly: editFlag == 'edit' ? formDetails.disabled : editFlag == 'view' ? true : ""
            }}

        />

    )
}

export default TextBox