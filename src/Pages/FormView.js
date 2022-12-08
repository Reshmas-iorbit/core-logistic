import axios from 'axios';
import React, { Component } from 'react'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { withRouter } from '../Components/WithRouter';
import SelectClass from '../Components/SelectClass';
import TextFieldClass from '../Components/TextFieldClass';
import DateClass from '../Components/DateClass';
import ButtonClass from '../Components/ButtonClass';


export class FormView extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.showData = this.showData.bind(this);
        const { aev } = this.props.params;

        this.state = {

            inputDetails: {},
            formDetails: {},
            search: '',
            view: aev,
            selected: [],
            isSubmit: '',
            formErrors: ''

        }

    };
    showData(url) {

        console.log(url, "url :");

        axios.post(url, this.state.inputDetails)
            .then((resp) => {
                // setFormDetails(resp.data)
                console.log(resp);
            })
    }
    onChange(e) {
        // this.setState ({
        //    inputDetails: this.state.bind
        // }) 
        // var newData = this.state.formDetails

        console.log(this.state.inputDetails);
        const name = e.target.name;
        const value = e.target.value
        this.setState({
            inputDetails: {
                ...this.state.inputDetails, [name]: value
            }
        })
    }
    getData() {
        console.log("component did mount getdata");
        axios.get(this.props.fields)
            .then((resp) => {
                console.log(resp.data);
                this.setState({ formDetails: resp.data })
            })
        //console.log(this.state.view,"view +++++++++");F
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevState, "component did update ");
    }
    render() {
        return (
            // <ThemeProvider
            // // theme={theme}
            // >
            <Container component="main" maxWidth>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        //component="form"
                        noValidate
                        //onSubmit={handleSubmit}
                        sx={{ mt: 4 }}
                    >
                        <Grid container spacing={10}>
                            {
                                Object.keys(this.state.formDetails).length ? (
                                    this.state.formDetails.division.formelements.map((item, index) => {
                                        return (
                                            <Grid key={index} item xs={12} sm={4} >
                                                {
                                                    item.control == 'select' ? (
                                                        <SelectClass formDetails={item} onChange={this.onChange} inputDetails={this.state.inputDetails} editFlag={this.props.params.aev} />)
                                                        : item.control == 'textbox' ? (<TextFieldClass formDetails={item} onChange={this.onChange} inputDetails={this.state.inputDetails} editFlag={this.props.params.aev} />)
                                                            : item.control == 'date' ? (<DateClass formDetails={item} onChange={this.onChange} inputDetails={this.state.inputDetails} editFlag={this.props.params.aev} />)
                                                                : (<>No Data Box</>)

                                                }
                                                {/* // <FormFields FormDetails={item} onChange={onChange} inputDetails={inputDetails} /> */}
                                            </Grid>
                                        )
                                    })
                                ) : <div>No Data</div>
                            }
                            {
                                Object.keys(this.state.formDetails).length ? (
                                    this.state.formDetails.division.buttons.map((item, index) => {
                                        return (
                                            <Grid key={index} item xs={12} sm={3} >
                                                <ButtonClass formDetails={item} showData={this.showData} inputDetails={this.state.inputDetails} aev={this.props.params.aev} />
                                                {/* <Buttons formDetails={item} showData={showData} inputDetails={inputDetails} aev={aev} /> */}
                                            </Grid>
                                        )
                                    })
                                ) : <div>No Data</div>
                            }
                        </Grid>
                    </Box>
                </Box>
            </Container>
            // </ThemeProvider>
        )
    }
}
export default withRouter(FormView);
