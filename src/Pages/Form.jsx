import * as React from "react";
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
import axios from "axios";
import TextBox from "../Components/TextField";
import Date from "../Components/Date";
import Selects from "../Components/Select";
import { useNavigate, useParams } from "react-router-dom";

import Buttons from "../Components/Button";
import EnhancedTable from "../Components/DataTable";
import ButtonClass from "../Components/ButtonClass";
import SelectClass from "../Components/SelectClass";
import TextFieldClass from "../Components/TextFieldClass";
import DateClass from "../Components/DateClass";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://iorbit-tech.com/">
        iOrbit Digital Technologies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function RegForm({ fields, list, aev }) {
  const navigate = useNavigate()
  // console.log(fields,"link for json");
  //const { aev } = useParams();
  console.log(aev);
  const styles = {
    border: '1px solid rgba(0, 0, 0, 0.3)', padding: '5px'
  };



  const [inputDetails, setInputDetails] = React.useState({});
  const [formDetails, setFormDetails] = React.useState({});
  const [searchBar, setSearchBar] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [view, setView] = React.useState(aev);
  const [selected, setSelected] = React.useState([]);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleSearchButton = () => {
    axios.get("/Details/search.json")
      .then((resp) => {
        console.log(resp.data);
        setInputDetails(resp.data)
      })

    console.log(search, "button click");
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    console.log("value: ", value, "name :", name);

    setInputDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };


  const showData = (url) => {
    console.log(url, "url :");

    axios.post(url, inputDetails)
      .then((resp) => {
        // setFormDetails(resp.data)
        console.log(resp);
      })
  };

  const handleEditButton = () => {

    const ress = {}
    const newDescData = view[0].map((item, index) => {
      ress[view[0][index].dataAttribute] = view[1][0][index]
    })
    setInputDetails(ress)
    console.log(ress, "from handle button");
    navigate("/form/edit")
  }



  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) console.log(inputDetails);
  }, [formErrors]);

  React.useEffect(() => {
    axios.get(fields)
      .then((resp) => setFormDetails(resp.data))
  }, []);

  React.useEffect(() => {
    if (aev != 'add') {
      console.log('edit function');
      axios.get(list)
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

          // console.log(newData,"converted array");
          setInputDetails(newData)
          if (aev == 'list') {
            axios.get("/Service/posearch.json")
              .then((resp) => {
                setSearchBar(resp.data)
                console.log(resp, "serach f");
              })
          }
        })
    }
  }, [formDetails])
  return (
    <ThemeProvider theme={theme}>
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
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 4 }}
          >
            {
              aev == 'list' ? (<>
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
                    Object.keys(searchBar).length ? (
                      searchBar.division.formelements.map((item, index) => {
                        return (
                          <div style={{ width: 200, margin: 5 }}>
                            {
                              item.control == 'select' ? (
                                <SelectClass formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev} />)
                                : item.control == 'textbox' ? (<TextBox formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev} />)
                                  : item.control == 'date' ? (<DateClass formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev} />)
                                    : (<>No Data Box</>)

                            }
                            {/* // <FormFields FormDetails={item} onChange={onChange} inputDetails={inputDetails} /> */}
                          </div>
                        )
                      })
                    ) : <div>No Data</div>
                  }
                  <div>
                    <Button fullWidth onClick={handleSearchButton} style={{ marginLeft: 10 }} variant="contained">Search</Button>
                  </div></div>
                <EnhancedTable inputDetails={inputDetails} selected={selected} setSelected={setSelected} setView={setView} />

              </>) : aev == 'view' ? (

                <div>
                  <div>

                    <Grid container spacing={4}>

                      {

                        view && [...Array(view[0].length).keys()].map((item, index) => {
                          return (
                            <Grid item xs={12} sm={4} >
                              <div style={styles}>
                                <h3>
                                  {view[0][index].headerLabel}
                                </h3>
                                <p>
                                  {view[1][0][index]}
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
                        onClick={() => handleEditButton()}
                      >
                        EDIT
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ) :

                (<Grid container spacing={10}>
                  {
                    Object.keys(formDetails).length ? (
                      formDetails.division.formelements.map((item, index) => {
                        return (
                          <Grid key={index} item xs={12} sm={4} >
                            {
                              item.control == 'select' ? (
                                <SelectClass formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev} />)
                                : item.control == 'textbox' ? (<TextFieldClass formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev} />)
                                  : item.control == 'date' ? (<DateClass formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev} />)
                                    : (<>No Data Box</>)

                            }
                            {/* // <FormFields FormDetails={item} onChange={onChange} inputDetails={inputDetails} /> */}
                          </Grid>
                        )
                      })
                    ) : <div>No Data</div>
                  }
                  {
                    Object.keys(formDetails).length ? (
                      formDetails.division.buttons.map((item, index) => {
                        return (
                          <Grid key={index} item xs={12} sm={3} >
                            <ButtonClass formDetails={item} showData={showData} inputDetails={inputDetails} aev={aev} />
                            {/* <Buttons formDetails={item} showData={showData} inputDetails={inputDetails} aev={aev} /> */}
                          </Grid>
                        )
                      })
                    ) : <div>No Data</div>
                  }
                </Grid>
                )
            }
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}