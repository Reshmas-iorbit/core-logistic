import * as React from "react";
import Avatar from "@mui/material/Avatar";
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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import TextBox from "../Components/TextField";
import Date from "../Components/Date";
import Selects from "../Components/Select";
import { useParams } from "react-router-dom";

import Buttons from "../Components/Button";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function RegForm() {


  const { aev } = useParams();
  console.log(aev);

  const [inputDetails, setInputDetails] = React.useState({});
  const [formDetails, setFormDetails] = React.useState({});

  const [isSubmit, setIsSubmit] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});

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
  const showData = () => {
    console.log("inputDetails:", inputDetails);

  };
  React.useEffect(() => {
    console.log(inputDetails)
  }, [inputDetails])
  React.useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) console.log(inputDetails);
  }, [formErrors]);

  React.useEffect(() => {
    axios.get("/Service/po.json")
      .then((resp) => setFormDetails(resp.data))
  }, []);
  React.useEffect(() => {
    if (aev != 'add') {
      console.log('edit function');
      axios.get("/Details/description.json")
        .then((resp) =>{ 
          console.log(resp.data);
          setInputDetails(resp.data)
        })
    }
  }, [formDetails])
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            <Grid container spacing={4}>
              {
                Object.keys(formDetails).length ? (
                  formDetails.division.formelements.map((item, index) => {
                    return (
                      <Grid item xs={12} sm={6} >
                        {
                          item.control == 'select' ? (<Selects formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev}/>)
                            : item.control == 'textbox' ? (<TextBox formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev}/>)
                              : item.control == 'date' ? (<Date formDetails={item} onChange={onChange} inputDetails={inputDetails} editFlag={aev} />)
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
                      <Grid item xs={12} sm={6} >
                        <Buttons formDetails={item} showData={showData} inputDetails={inputDetails} />
                      </Grid>
                    )
                  })
                ) : <div>No Data</div>

              }

            </Grid>

            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
