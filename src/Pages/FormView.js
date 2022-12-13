import axios from 'axios';
import React, { Component } from 'react'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
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
import { json } from 'react-router-dom';
import TextBox from '../Components/TextField';
import EnhancedTable from '../Components/DataTable';
import { PanTool } from '@mui/icons-material';
import DataTableClass from '../Components/DataTableClass';


export class FormView extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.showData = this.showData.bind(this);
        this.setSelected = this.setSelected.bind(this);
        this.setView = this.setView.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);

        //console.log(,this.props.aev"aev propsss");
        const { aev } = this.props.aev;

        this.state = {

            inputDetails: {},
            searchInputDetails: {},
            formDetails: {},
            search: '',
            searchBar: {},
            view: aev,
            selected: [],
            isSubmit: '',
            formErrors: ''

        }

    };

    handleEditButton () {
        console.log("from handle button");
        const ress = {}
        const newDescData = this.state.view[0].map((item, index) => {
          ress[this.state.view[0][index].dataAttribute] = this.state.view[1][0][index]
        })
        this.setState({
            inputDetails: {...ress}
        })
        //setInputDetails(ress)
        console.log(ress, "from handle button");
        this.props.navigate('/test/edit')
        //navigate("/test/edit")
      }

    setView(selectedView) {
        console.log(selectedView, "selected viewww");
        this.setState({
            view: selectedView
        })

    }
    setSelected(newSelected) {
        const selection = newSelected
        console.log(selection, "selected");
        this.setState({
            selected: selection
        })

        // this.setState({
        //     selected: [...selection]
        // })
    }
    showData(url) {

        console.log(url, "url :");

        axios.post(url, this.state.inputDetails)
            .then((resp) => {
                // setFormDetails(resp.data)
                console.log(resp);
            })
    }
    onChangeSearch(e) {

        console.log(this.state.searchInputDetails);
        const name = e.target.name;
        const value = e.target.value
        this.setState({
            searchInputDetails: {
                ...this.state.searchInputDetails, [name]: value
            }
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
        if (prevState.formDetails != this.state.formDetails) {
            console.log("State Changed");
            if (this.props.aev != 'add') {
                console.log('edit function');
                axios.get(this.props.list)
                    .then((resp) => {
                        //console.log(resp.data,"data from listtt");
                        const array = [];
                        resp.data.data.map((item, index) => {
                            array.push(Object.values(item))
                            // console.log(Object.values(item),"itemsss from array");
                        })
                        const newData = {};
                        newData.headCells = resp.data.headCells
                        newData.data = array

                        console.log(newData, "converted array");
                        this.setState({
                            inputDetails: { ...newData }
                        })
                        //setInputDetails(newData)
                        if (this.props.aev == 'list') {
                            axios.get("/Service/posearch.json")
                                .then((resp) => {
                                    this.setState({
                                        searchBar: resp.data
                                    })
                                    //setSearchBar(resp.data)
                                    console.log(resp, "serach f");
                                })
                        }
                    })
            }
        }
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
                    >{

                            this.props.aev == 'list' ? (<>
                                {/* <TableData inputDetails={inputDetails} /> */}
                                <div style={{ display: "flex", alignItems: "center" }}>

                                    {/* <TextField
                                value={search}
                                name="search"
                                id="filled-search"
                                label="Search field"
                                type="search"
                                variant="filled"
                                onChange={(e) => { handleSearch(e) }}
                              />
                              <Button onClick={handleSearchButton} style={{ marginLeft: 10 }} variant="contained">Search</Button> */}
                                    {
                                        Object.keys(this.state.searchBar).length ? (
                                            this.state.searchBar.division.formelements.map((item, index) => {
                                                return (
                                                    <div key={index} style={{ width: 200, margin: 5 }}>
                                                        {
                                                            item.control == 'select' ? (
                                                                <SelectClass formDetails={item} onChange={this.onChangeSearch} inputDetails={this.state.searchInputDetails} editFlag={this.props.aev} />)
                                                                : item.control == 'textbox' ? (<TextFieldClass formDetails={item} onChange={this.onChangeSearch} inputDetails={this.state.searchInputDetails} editFlag={this.props.aev} />)
                                                                    : item.control == 'date' ? (<DateClass formDetails={item} onChange={this.onChangeSearch} inputDetails={this.state.searchInputDetails} editFlag={this.props.aev} />)
                                                                        : (<>No Data Box</>)

                                                        }
                                                        {/* // <FormFields FormDetails={item} onChange={onChange} inputDetails={inputDetails} /> */}
                                                    </div>
                                                )
                                            })
                                        ) : <div>No Data</div>
                                    }
                                    <div>
                                        <Button fullWidth onClick={this.handleSearchButton} style={{ marginLeft: 10 }} variant="contained">Search</Button>
                                    </div>
                                </div>
                                {/* <EnhancedTable inputDetails={this.state.inputDetails} selected={this.state.selected} state={this.state}
                                    setSelected={this.setSelected}
                                //setView={setView}
                                /> */}
                                <EnhancedTable inputDetails={this.state.inputDetails} selected={this.state.selected} state={this.state} setState={this.setState}
                                    setSelected={this.setSelected}
                                    setView={this.setView}
                                />

                            </>) :  this.props.aev == 'view' ? (
                                <div >
                                    <div>

                                        <Grid container spacing={4}>

                                            {

                                                this.state.view && [...Array(this.state.view[0].length).keys()].map((item, index) => {
                                                    return (
                                                        <Grid item xs={12} sm={4} >
                                                            <div 
                                                            //style={styles}
                                                            >
                                                                <h3>
                                                                    {this.state.view[0][index].headerLabel}
                                                                </h3>
                                                                <p>
                                                                    {this.state.view[1][0][index]}
                                                                </p>
                                                            </div>
                                                        </Grid>
                                                    )
                                                })

                                            }


                                        </Grid>
                                    </div>
                                    <Grid container spacing={4}>
                                        <Grid xs={3} sm={3} >
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 10, mb: 2 }}
                                                onClick={this.handleEditButton}
                                            >
                                                EDIT
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            ) :
                                (<>
                                    <Grid container spacing={10}>
                                        {
                                            Object.keys(this.state.formDetails).length ? (
                                                this.state.formDetails.division.formelements.map((item, index) => {
                                                    return (
                                                        <Grid key={index} item xs={12} sm={4} >
                                                            {
                                                                item.control == 'select' ? (
                                                                    <SelectClass formDetails={item} onChange={this.onChange} inputDetails={this.state.inputDetails} editFlag={this.props.aev} />)
                                                                    : item.control == 'textbox' ? (<TextFieldClass formDetails={item} onChange={this.onChange} inputDetails={this.state.inputDetails} editFlag={this.props.aev} />)
                                                                        : item.control == 'date' ? (<DateClass formDetails={item} onChange={this.onChange} inputDetails={this.state.inputDetails} editFlag={this.props.aev} />)
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
                                                            <ButtonClass formDetails={item} showData={this.showData} inputDetails={this.state.inputDetails} aev={this.props.aev} />
                                                            {/* <Buttons formDetails={item} showData={showData} inputDetails={inputDetails} aev={aev} /> */}
                                                        </Grid>
                                                    )
                                                })
                                            ) : <div>No Data</div>
                                        }
                                    </Grid>
                                </>)









                        }
                    </Box>
                </Box>
            </Container >
            // </ThemeProvider>
        )
    }
}
export default withRouter(FormView);
