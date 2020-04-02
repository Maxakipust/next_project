import React from 'react';
import ScheduleInput from "../components/scheduleInput";
import TimeInput from "../components/timeInput";

export default class PortAvailability extends React.Component{
    timeChange(times){
        this.props.setPortAvailability(times);
    }

    render() {
        let portAvailability = this.props.portAvailability ? this.props.portAvailability : [];
        return <div>
            PORT AVAILABILITY
            <TimeInput rows={portAvailability.length<3?3:portAvailability.length} startValues={portAvailability} onChange={this.timeChange.bind(this)}/>
            <button onClick={(e)=>{this.props.setPage("main")}}>Home</button>
        </div>
    }
}