import React, { Component } from 'react'

import { withRouter } from '../Components/WithRouter';


export class FormView extends Component {
    constructor(props) {
        super(props);
        const { aev } = this.props.params;
        this.state = {

            statname: [], 
            nextstatename: '',
        }
        const params = this.props.params;
        console.log(params);
    }
    
   
    render() {
        return (
            <div style={{ height: 200, width: 200, backgroundColor: "red" }}>FormView</div>
        )
    }
}
export default withRouter(FormView);
