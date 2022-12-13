import React, { Component } from 'react'

export class DataTableClass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            order: "asc",
            orderBy: "",
            page: 0,
            dense: false,
            rowsPerPage: 5,
        }
        console.log(this.props.state, "state");
        console.log(this.props.setState, "setState");

    }
    setViewState() {

        const selectedData = Object.keys(this.props.inputDetails).length && this.props.inputDetails.data.filter((row) => {
            return row[0] == this.state.selected[0]

        })
        setTimeout(() => {
            console.log("Timeout >>>>>>>>>>>>>>");
            Object.keys(this.props.inputDetails).length && (
                this.props.setState({
                    view: [[...this.props.inputDetails.headCells], [...selectedData]]
                })
                // setView([[...this.props.inputDetails.headCells], [...selectedData]])
            )
        }, 1000)

    }
    buttonClick(){
       this.props.setSelected("hellooo")
        // console.log("button click");
        // this.props.setState({
        //     isSubmit: "test"
        // })
    }
    render() {
        return (
            <div><button onClick={this.buttonClick}>click</button></div>
        )
    }
}

export default DataTableClass