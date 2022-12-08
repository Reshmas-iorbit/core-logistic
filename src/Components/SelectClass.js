import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { Component } from 'react'

export default class SelectClass extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl fullWidth >
                <InputLabel>{this.props.formDetails.label}</InputLabel>
                <Select
                    required
                    fullWidth
                    label={this.props.formDetails.id}
                    // size='small'
                    variant='outlined'
                    type="select"
                    name={this.props.formDetails.id}
                    onChange={(e) => this.props.onChange(e)}
                    value={this.props.inputDetails[this.props.formDetails.id]}
                    InputProps={{
                        readOnly: this.props.editFlag == 'edit' ? this.props.formDetails.disabled : this.props.editFlag == 'view' ? true : false
                    }}

                >
                    <MenuItem
                        onChange={(e) => this.props.onChange(e)}
                        value={this.props.inputDetails[this.props.formDetails.id]}

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
}
