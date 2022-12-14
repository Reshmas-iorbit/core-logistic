import { Button } from '@mui/material';
import React, { Component } from 'react'

export class ButtonClass extends Component {
    constructor(props) {
        super(props);
        // const { aev } = this.props.params;
      

    }
    render() {
        return (
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={this.props.formDetails.submitURL ? () => this.props.showData(this.props.formDetails.submitURL) : ''}
            >
                {this.props.aev != 'edit' ? this.props.formDetails.label : this.props.formDetails.submitURL ? "Save" : "Cancel"}
            </Button>
        )
    }
}

export default ButtonClass