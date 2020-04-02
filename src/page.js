import React from 'react';
import Main from "./pages/main";
import Error from "./pages/error";
import PortAvailability from "./pages/PortAvailability";
import Legs from "./pages/legs";

export default function Page(){

    let [page, setPage] = React.useState("main");
    let [portAvailability, setPortAvailability] = React.useState(null);
    let [legs, setLegs] = React.useState(null);
    let [deliveryTimes, setDeliveryTime] = React.useState(null);

    window.error = (message)=>{
        window.errorMessage = message;
        setPage("error");
    };
    window.setPage = (page)=>{
        setPage(page);
    };

    switch(page) {
        case "main":
            return <Main {...{portAvailability, legs, deliveryTime: deliveryTimes, setPage}}/>;
        case "portAvailability":
            return <PortAvailability {...{portAvailability, setPortAvailability, setPage}}/>;
        case "legs":
            return <Legs {...{legs, setLegs, setPage}}/>;
        case "deliveryTimes":
            //return <DeliveryTimes {...{legs, setLegs, setPage}}/>;
        case "error":
            return <Error {...{setPage}}/>;
        default :
            window.errorMessage = "Invalid page";
            return <Error {...{setPage}}/>;
    }
}