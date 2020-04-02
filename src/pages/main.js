import React from 'react';

export default class Main extends React.Component{

    portAvailability(){
        if(this.props.portAvailability) {
            return (
                <div>
                    <button onClick={(e) => {
                        this.props.setPage("portAvailability")
                    }}>Set Port Availability</button>
                    <table>
                        <th>
                            <td>Times</td>
                        </th>
                        {
                            this.props.portAvailability.map((time) => {
                                return (
                                    <tr>
                                        <td>
                                            {time.format('LT')}
                                        </td>
                                    </tr>
                                )
                            }, [])
                        }
                    </table>
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
                <table>
                    <th>
                        <td>Leg</td>
                        <td>Distance</td>
                        <td>Speed</td>
                        <td>Traffic</td>
                        <td>Wait Time</td>
                    </th>
                    {this.props.legs.map((leg, index)=>{
                        return (<tr>
                            <td>{index+1}</td>
                            <td>{leg.distance}</td>
                            <td>{leg.speed}</td>
                            <td>{leg.traffic}</td>
                            <td>{leg.waitTime}</td>
                        </tr>)
                    }, [])}
                </table>
                <button onClick={(e) => {
                    this.props.setPage("legs")
                }}>Set Legs</button>
            </div>);
        }else{
            return <div><button onClick={(e) => {
                this.props.setPage("legs")
            }}>Set Legs</button></div>
        }
    }

    deliveryTimes(){
        if(this.props.deliveryTimes){
            return (
                <div>
                    {
                        this.props.deliveryTimes.timeEpocs.map((time, index) => {
                            return (<div>{time.format('LT')}</div>)
                        }, [])
                    }
                    <button onClick={(e) => {
                        this.props.setPage("deliveryTimes")
                    }}>Set Delivery Times</button>
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
        let deliveryTimes = this.deliveryTimes();
        return (
            <div>
                <div>Port Availability: {portAvail}</div>
                <div>Legs: {leg}</div>
                <div>Delivery Times: {deliveryTimes}</div>
                <div></div>
            </div>
        );
    }
}