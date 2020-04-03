import React from 'react';

export default class Main extends React.Component{

    renderSchedule(schedule,nameHeader, valueHeader){
        let eles = [];
        eles.push(
            <thead key={-1}>
            <tr key={0}>
                <th>{nameHeader}</th>
                <th>{valueHeader}</th>
            </tr>
            </thead>
        );
        eles.push(<tbody key={-2}>{schedule.times.map((time, index)=>{
            return (
                <tr key={index+1}>
                    <td>{time.format("LT")}</td>
                    <td>{schedule.values[index]}</td>
                </tr>
            )
        }, [])}</tbody>);
        return <table>{eles}</table>;
    }

    portAvailability(){
        if(this.props.portAvailability) {
            return (
                <div>
                    <button onClick={(e) => {
                        this.props.setPage("portAvailability")
                    }}>Set Port Availability</button>
                    <table><thead>
                        <tr>
                            <th>Times</th>
                        </tr>
                    </thead>
                        <tbody>
                        {
                            this.props.portAvailability.map((time, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {time.format('LT')}
                                        </td>
                                    </tr>
                                )
                            }, [])
                        }
                    </tbody></table>
                </div>
            )
        }else {
            return <div><button onClick={(e) => {
                this.props.setPage("portAvailability")
            }}>Set Port Availability</button></div>
        }
    }

    legs(){
        if(this.props.legs){
            return (<div>
                <button onClick={(e) => {
                    this.props.setPage("legs")
                }}>Set Legs</button>
                <table>
                    <thead>
                    <tr>
                        <th>Leg</th>
                        <th>Distance</th>
                        <th>Speed</th>
                        <th>Traffic</th>
                        <th>Wait Time</th>
                        <th>Price Per Mile</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.legs.map((leg, index)=>{
                        return (<tr key={index}>
                            <td>{index+1}</td>
                            <td>{leg.distance}</td>
                            <td>{leg.speed}</td>
                            <td>{this.renderSchedule(leg.traffic, "Time", "Value")}</td>
                            <td>{this.renderSchedule(leg.waitTime, "Time", "Value")}</td>
                            <td>{this.renderSchedule(leg.pricePerMile, "Time", "Value")}</td>
                        </tr>)
                    }, [])}
                    </tbody>
                </table>
            </div>);
        }else{
            return <div><button onClick={(e) => {
                this.props.setPage("legs")
            }}>Set Legs</button></div>
        }
    }

    deliveryTime(){
        if(this.props.deliveryTime){
            console.log(this.props.deliveryTime);
            return (
                <div>
                    <button onClick={(e) => {
                        this.props.setPage("deliveryTimes")
                    }}>Set Delivery Times</button>
                    <div>{this.props.deliveryTime.format('LT')}</div>
                </div>
            );
        }else{
            return <div><button onClick={(e) => {
                this.props.setPage("deliveryTimes")
            }}>Set Delivery Times</button></div>;
        }
    }

    render() {
        let portAvail = this.portAvailability();
        let leg = this.legs();
        let deliveryTime = this.deliveryTime();
        return (
            <div>
                <div>Port Availability: {portAvail}</div>
                <div>Legs: {leg}</div>
                <div>Delivery Time: {deliveryTime}</div>
                {
                    this.props.portAvailability && this.props.legs && this.props.deliveryTime && <div>
                        <button onClick={this.props.setPage.bind(null,"calc")}>Calculate</button>
                    </div>
                }
            </div>
        );
    }
}