import React from 'react';
import * as moment from "moment";

export default class calc extends React.Component {
    getTime(timeList, currentTime){
        timeList = timeList.sort((time1, time2)=>{
            if(time1 === time2){
                return 0;
            }
            if(moment.max(time1, time2) === time1){
                return 1;
            }else{
                return -1;
            }
        });
        let prevMax;
        for(let index = 0; index < timeList.length; index++){
            if(moment.max(prevMax, timeList[index]) === prevMax){
                prevMax = timeList[index];
            }else{
                console.log("found", prevMax.format("LT"));
                return prevMax;
            }
        }
    }

    geLegTime(path, currentTime){
        return path.distance * path.speed;
    };

    getLegCost(leg, currentTime){
        let pathTime = this.getLegTime(leg, currentTime);

    }

    createPathsPWP(){
        let portAvailabilities = this.props.portAvailability;
        let legs = this.props.legs;
        let deliveryTime = this.props.deliveryTime;
        let paths = [];

        this.getTime(portAvailabilities, deliveryTime);


        portAvailabilities.forEach((time)=>{
        });
    }
    createPathsPWYP(){

    }
    createPathsPYWYP(){

    }

    render() {
        let paths = [];
        paths.push(this.createPathsPWP());
        // paths.push(this.createPathsPWYP());
        // paths.push(this.createPathsPYWYP());

        return (
            <div>
                <table>
                </table>
            </div>
        );
    }
}