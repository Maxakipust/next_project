import React from "react";
import ScheduleInput from "../components/scheduleInput";
import Collapsible from "../components/collapsible";
//for each leg
// distance     (number)
// speed        (number)
// traffic      (schedule)
// wait time    (schedule)
// price/mile   (schedule)
export default class Legs extends React.Component{
    constructor(props) {
        super(props);
        let legs = [];
        if(this.props.legs){
            legs = this.props.legs;
        }else{
            for(let i = 0; i<6; i++){
                legs.push({
                    traffic:{
                        times:[],
                        values:[],
                    },
                    waitTime:{
                        times:[],
                        values:[],
                    },
                    pricePerMile:{
                        times:[],
                        values:[],
                    },
                });
            }
        }
        this.state = {
            legs:legs
        }
    }

    setDistance(index, value){
        let legs = this.state.legs;
        legs[index].distance = value;
        this.setState({legs});
        this.props.setLegs(legs);
    }
    setSpeed(index, value){
        let legs = this.state.legs;
        legs[index].speed = value;
        this.setState({legs});
        this.props.setLegs(legs);
    }

    setTraffic(index, times, values){
        let legs = this.state.legs;
        legs[index].traffic.times = times;
        legs[index].traffic.values = values;
        this.setState({legs});
        this.props.setLegs(legs);
    }

    setPricePerMile(index, times, values){
        let legs = this.state.legs;
        legs[index].pricePerMile.times = times;
        legs[index].pricePerMile.values = values;
        this.setState({legs});
        this.props.setLegs(legs);
    }

    setWaitTime(index, times, values){
        let legs = this.state.legs;
        legs[index].waitTime.times = times;
        legs[index].waitTime.values = values;
        this.setState({legs});
        this.props.setLegs(legs);
    }


    render() {
        let legEles = this.state.legs.map((leg, index)=>{
            return (<div>
                <Collapsible title={"Leg "+(index+1)}>
                    <div><input
                        type="text"
                        value={leg.distance?leg.distance:''}
                        key={index+"distance"}
                        onChange={(e)=> {
                            this.setDistance(index, e.target.value);
                        }}
                        placeholder="distance (miles)"
                    /></div>
                    <div><input
                        type="text"
                        value={leg.speed?leg.speed:''}
                        key={index+"speed"}
                        onChange={(e)=> {
                            this.setSpeed(index, e.target.value);
                        }}
                        placeholder="speed (miles/hr)"
                    /></div>
                    <div>
                        Traffic:
                        <ScheduleInput callback={this.setTraffic.bind(this,index)} valuePlaceHolder="Traffic (Scalar)"/>
                    </div>

                    <div>
                        Wait Time:
                        <ScheduleInput callback={this.setWaitTime.bind(this,index)} valuePlaceHolder="Wait Time (Minutes)"/>
                    </div>
                    <div>
                        Price Per Mile:
                        <ScheduleInput callback={this.setPricePerMile.bind(this,index)} valuePlaceHolder="Price Per Mile (Dollars)"/>
                    </div>
                </Collapsible>
            </div>)
        }, []);
        return <div>
            Legs:
            {legEles}
            <div><button onClick={(e) => {
                this.props.setPage("main")
            }}>Home</button></div>
        </div>
    }
}