import React from 'react';
import ScheduleInput from "../components/scheduleInput";

export default class PortAvailability extends React.Component{
    render() {
        return <div>
            PORT AVAILABILITY
            <ScheduleInput>
            </ScheduleInput>
            <button onClick={(e)=>{this.props.setPage("main")}}>Home</button>
        </div>
    }
}