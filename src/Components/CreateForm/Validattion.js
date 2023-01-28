import { TextField } from "@mui/material";

export const validation = (comp, type) => {
    console.log("from validate ", comp, type);
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let phone = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    let alphanumeric = /^[a-z0-9\s,'-]*$/;
    let price = /^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/;
    let aadhar = /^\d{4}\s\d{4}\s\d{4}$/;
    let pan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    

    if (type == 'email') {
        if (comp.match(regex))
            return true;
        else
            return false;
    } else if (type == 'phone') {
        if (comp.match(phone))
            return true;
        else
            return false;
    }
    else if (type == 'alphanumeric') {
        if (comp.match(alphanumeric))
            return true;
        else
            return false;
    }
    else if (type == 'price') {
        if (comp.match(price))
            return true;
        else
            return false;
    }
    else if (type == 'aadhar') {
        if (comp.match(aadhar))
            return true;
        else
            return false;
    }
    else if (type == 'pan') {
        if (comp.match(pan))
            return true;
        else
            return false;
    }
    else {
        return true;
    }



}

