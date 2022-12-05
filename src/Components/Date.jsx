import { TextField } from '@mui/material'
import React from 'react'

const Date = ({formDetails,onChange,inputDetails}) => {
  return (
    
    <TextField

    focused
    id="outlined-uncontrolled"
    fullWidth
    required
    label={formDetails.label}
    // size='small'
    type="date"
    variant='outlined'
    onChange={onChange}
    name={formDetails.label}
    value={inputDetails.date}
/>
  )
}

export default Date