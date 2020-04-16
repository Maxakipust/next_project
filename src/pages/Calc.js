import React from 'react';
import * as moment from "moment";

export default class calc extends React.Component {
    getTimeIndex(timeList, currentTime){
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
        for(let index = 0; index < timeList.length; index++){
            if(moment.max(currentTime, timeList[index]) === timeList[index]){
                if(index === 0){
                    return timeList.length-1;
                }
                return index-1;
            }
        }
        return timeList.length-1;
    }

    getLegTime(path, currentTime){
        let regTime = (parseInt(path.distance) / parseInt(path.speed) )* 60;
        let traffic = parseInt(path.traffic.values[this.getTimeIndex(path.traffic.times, currentTime)]);
        let waitTime = parseInt(path.waitTime.values[this.getTimeIndex(path.waitTime.times, currentTime)]);
        return (regTime*traffic) + waitTime;
    };

    getLegCost(path, currentTime){
        let pathLength = parseInt(path.distance);
        let pathCost = path.pricePerMile.values[this.getTimeIndex(path.pricePerMile.times, currentTime)];
        return pathLength*pathCost;
    }

    createPathsPWP(){
        let portAvailabilities = this.props.portAvailability;
        let legs = this.props.legs;
        let deliveryTime = this.props.deliveryTime;
        let paths = [];

         portAvailabilities.forEach((time)=>{
             let PWTime = this.getLegTime(legs[4], time);
             let WPTime = this.getLegTime(legs[5], time);
             if(moment.max(time.add(PWTime + WPTime, 'm'), deliveryTime)!==deliveryTime){
                let PWCost = this.getLegCost(legs[4], time);
                let WPCost = this.getLegCost(legs[5], time);
                let totalCost = PWCost + WPCost;
                paths.push({
                    path:"PWP",
                    cost:totalCost,
                    time:PWTime+WPTime,
                    start:time,
                    end:time.add(PWTime + WPTime, 'm'),
                });
             }
         });
         console.log(paths);
         return paths;
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