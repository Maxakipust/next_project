import React from 'react';
import Main from "./pages/main";
import Error from "./pages/error";
import PortAvailability from "./pages/portAvailability";
import Legs from "./pages/legs";
import moment from "moment";
import DeliveryTime from "./pages/deliveryTime";
import Calc from "./pages/Calc";

export default function Page(){

    let [loaded, setLoaded] = React.useState(false);
    let [page, setPage] = React.useState("main");
    let [portAvailability, setPortAvailability] = React.useState(null);
    let [legs, setLegs] = React.useState(null);
    let [deliveryTime, setDeliveryTime] = React.useState(null);

    React.useEffect(() => {
        if(!loaded){
            let sessionPortAvailability = sessionStorage.getItem("portAvailability");
            let sessionLegs = sessionStorage.getItem("legs");
            let sessionDeliveryTime = sessionStorage.getItem("deliveryTime");
            if(sessionPortAvailability){
                let tempPortAvailability = JSON.parse(sessionPortAvailability);
                if(tempPortAvailability){
                    tempPortAvailability = tempPortAvailability.map((timeStr)=>{
                        return moment(timeStr);
                    }, []);
                    setPortAvailability(tempPortAvailability);
                }
            }
            if(sessionLegs){
                let tempLegs = JSON.parse(sessionLegs);
                if(tempLegs){
                    tempLegs.forEach((leg, index)=>{
                        tempLegs[index].traffic.times = tempLegs[index].traffic.times.map((timeString)=>{
                            return moment(timeString);
                        }, []);
                        tempLegs[index].waitTime.times = tempLegs[index].waitTime.times.map((timeString)=>{
                            return moment(timeString);
                        }, []);
                        tempLegs[index].pricePerMile.times = tempLegs[index].pricePerMile.times.map((timeString)=>{
                            return moment(timeString);
                        }, []);
                    });
                    setLegs(tempLegs);
                }
            }
            if(sessionDeliveryTime){
                setDeliveryTime(moment(JSON.parse(sessionDeliveryTime)));
            }
            setLoaded(true);
        }else{
            sessionStorage.setItem("portAvailability", JSON.stringify(portAvailability));
            sessionStorage.setItem("legs", JSON.stringify(legs));
            sessionStorage.setItem("deliveryTime", JSON.stringify(deliveryTime));
        }
    });

    window.error = (message)=>{
        window.errorMessage = message;
        setPage("error");
    };
    window.setPage = (page)=>{
        setPage(page);
    };

    switch(page) {
        case "main":
            return <Main {...{portAvailability, legs, deliveryTime, setPage}}/>;
        case "portAvailability":
            return <PortAvailability {...{portAvailability, setPortAvailability, setPage}}/>;
        case "legs":
            return <Legs {...{legs, setLegs, setPage}}/>;
        case "deliveryTimes":
            return <DeliveryTime {...{deliveryTime, setDeliveryTime, setPage}}/>;
        case "calc":
            return <Calc {...{portAvailability, legs, deliveryTime, setPage}}/>;
        case "error":
            return <Error {...{setPage}}/>;
        default :
            window.errorMessage = "Invalid page";
            return <Error {...{setPage}}/>;
    }
}