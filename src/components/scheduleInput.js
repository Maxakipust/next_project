import React from 'react';
import moment from "moment";

class ScheduleInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows:this.props.rows?this.props.rows:3,
            timeStrings: [],
            timeEpocs: [],
            values: [],
        }
    }

    setTime(row, value) {
        let timeStrings = this.state.timeStrings;
        timeStrings[row] = value;
        this.setState({timeStrings});
    }

    finalizeTime(row){
        let value = this.state.timeStrings[row];
        let timeEpocs = this.state.timeEpocs;
        let timeStrings = this.state.timeStrings;
        timeEpocs[row] = moment(value, "LT");
        timeStrings[row] = timeEpocs[row].format("LT");
        this.setState({timeEpocs, timeStrings});
        this.callback();
    }

    setValue(row, value){
        let values = this.state.values;
        values[row] = value;
        this.setState({values});
        this.callback();
    }

    callback(){
        this.props.callback(this.state.timeEpocs, this.state.values);
    }

    addRow(){
        this.setState({rows:this.state.rows+1});
    }

    removeRow(){
        let {timeEpocs, timeStrings, values, rows} = this.state;
        timeEpocs.pop();
        timeStrings.pop();
        values.pop();
        rows-=1;
        this.setState({timeEpocs, timeStrings, values, rows});
        this.callback();
    }

    random(){
        let {timeEpocs, timeStrings, values} = this.state;
        for(let i = 0; i<this.state.rows; i++){
            let hour = Math.round(Math.random()*23);
            let minute = Math.round(Math.random()*59);
            timeEpocs[i] = moment(hour +':'+minute, 'h:mm');
            timeStrings[i] = timeEpocs[i].format("LT");
            values[i] = Math.round(Math.random()*10*100)/100;
        }
        this.setState({timeEpocs, timeStrings, values});
        this.callback();
    }

    render() {
        let ret = [];
        for(let row = 0; row<this.state.rows; row++){
            ret.push(
                <div>
                    <input
                        type="text"
                        value={this.state.timeStrings[row]}
                        key={row+"time"}
                        onChange={(e)=> {
                            this.setTime(row, e.target.value);
                        }}
                        onBlur={this.finalizeTime.bind(this,row)}
                        placeholder="Time (ie. 5:30 PM)"
                    />
                    <input
                        type="text"
                        value={this.state.values[row]}
                        key={row+"value"}
                        onChange={(e)=>{
                            this.setValue(row, e.target.value);
                        }}
                        placeholder={this.props.valuePlaceHolder?this.props.valuePlaceHolder: "value"}
                    />
                </div>
            )
        }
        ret.push(<div><button onClick={this.random.bind(this)}>Random</button></div>);
        ret.push(<div><button onClick={this.addRow.bind(this)}>Add</button><button onClick={this.removeRow.bind(this)}>Remove</button> </div>);
        return <div>{ret}</div>;
    }
}

export default ScheduleInput;