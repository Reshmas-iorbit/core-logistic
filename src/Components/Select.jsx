import { FormControl, InputLabel, MenuItem } from '@mui/material'
import React from 'react'
import { Select } from '@mui/material'

const Selects = ({ formDetails, onChange, inputDetails, editFlag }) => {
    return (
        <FormControl fullWidth >
            <InputLabel>{formDetails.label}</InputLabel>
            <Select
                required
                fullWidth
                label={formDetails.id}
                // size='small'
                variant='outlined'
                type="select"
                name={formDetails.id}
                onChange={(e) => onChange(e)}
                value={inputDetails[formDetails.id]}
                InputProps={{
                    readOnly: editFlag == 'edit' ? formDetails.disabled : editFlag == 'view' ? true : false
                }}

            >
                <MenuItem
                    onChange={(e) => onChange(e)}
                    value={inputDetails[formDetails.id]}

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