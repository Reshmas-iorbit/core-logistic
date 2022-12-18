import { useNavigate, useParams } from "react-router-dom";
import React from 'react'
export function withRouter( Child ) {
    return ( props ) => {
      const params = useParams();
      const navigate = useNavigate();
      return <Child { ...props } params ={ params } navigate={navigate} />;
    }
  }