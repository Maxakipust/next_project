import React from 'react';
import TimeInput from "../components/timeInput";
import moment from "moment";

export default class DeliveryTime extends React.Component{
    constructor(props) {
        super(props);
        let timeString;
        let timeEpoc;
        if(this.props.deliveryTime){
            timeEpoc = this.props.deliveryTime;
            timeString = timeEpoc.format('LT');
        }
        this.state = {
            timeString,
            timeEpoc,
        }
    }

    setTime(value){
        this.setState({timeString:value});
    }
    finalizeTime(){
        let m = moment(this.state.timeString, 'LT');
        let str = m.format('LT');
        this.setState({timeEpoc:m, timeString:str});
        this.props.setDeliveryTime(m);
    }

    render() {
        return <div>
            Port Availability
            <input
                type="text"
                value={this.state.timeString}
                onChange={(e)=> {
                    this.setTime(e.target.value);
                }}
                onBlur={this.finalizeTime.bind(this)}
                placeholder="Time (ie. 5:30 PM)"
            />
            <button onClick={(e)=>{this.props.setPage("main")}}>Home</button>
        </div>
    }
}