import React,{Component} from 'react';

export default class SmartConnect extends Component{
    constructor(props){
        super(props);
        this.urlbuilder=this.urlbuilder.bind(this);
        this.postMethod=this.postMethod.bind(this);
        this.authenticate=this.authenticate.bind(this);
    }

    handleClick = () => {
    this.postMethod({"dType":"Event","flow":"Monitor","FlowAdmin":{"___smart_action___":"lookup","___smart_value___":"AdminSmartFlow"}},'http://','localhost:9082/','apptest/','AdminSmartFlow','ListDeployments')
    };
    
    urlbuilder(protocol,domain,tenant,object , endpoint) {
        var url=protocol+domain+tenant+ object +"/"+ endpoint;
        console.log(url)
        return url
    }

    postMethod(payload,protocol,domain,tenant,object,endpoint)
    {   
        var url=this.urlbuilder(protocol,domain,tenant,object,endpoint);
        //call authenticate function
        var fun=this.authenticate('http://','localhost:9082/','apptest/','Security','Authenticate')
        //localstorage getitem - store the session in a variable
        var id=localStorage.getItem('session',fun)
        //Pass the variable in the header
        const req={
        method:'POST',
        headers: { 'Content-Type': 'application/json','Session-Id':id},
        body:JSON.stringify(payload)
    }
       fetch(url,req)
        .then((res) => console.log(res.json()))
        .catch(err => { console.log(err) })
    }

    authenticate(protocol,domain,tenant,object,endpoint)
    {
        var url=this.urlbuilder(protocol,domain,tenant,object,endpoint);
        var pay={"identity":"apptestadmin","password":"apptestadmin","type":"custom","FlowAdmin":{"___smart_action___":"lookup","___smart_value___":"Security"}}    
        const req={
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(pay)
        }
        fetch(url,req)
       .then(res=>res.json()
       .then((resp)=>{
        var id=(resp.responses[0].sessionId); 
        console.log(id);
       localStorage.setItem('session', id); 
    }))
    };
    render(){
        return (
            <>
            <h1>get Method</h1>
            <button onClick={this.handleClick}>Post Method</button>
            </>
            )
        }
 }