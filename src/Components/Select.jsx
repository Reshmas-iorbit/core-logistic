import { FormControl, InputLabel, MenuItem } from '@mui/material'
import React from 'react'
import { Select } from '@mui/material'

const Selects = ({formDetails,onChange,inputDetails}) => {
  return (
    <FormControl fullWidth size="small">
                    <InputLabel>{formDetails.label}</InputLabel>
                    <Select
                        required
                        fullWidth
                        label={formDetails.id}
                        size='small'
                        variant='outlined'
                        type="select"
                        name={formDetails.id}
                        onChange={(e) => onChange(e)}
                        value={inputDetails[formDetails.origin]}
                    >
                        <MenuItem
                            onChange={(e) => onChange(e)}
                            value={inputDetails[formDetails.origin]}
                        >
                            {/* <em>None</em> */}
                        </MenuItem>
                        {
                            [
                                "Kerala", "Tamilnadu", "Karnataka"
                            ].map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            })
                        }

                    </Select>
                </FormControl>
            )
  
}

export default Selects