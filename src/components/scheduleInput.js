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
        console.log(timeEpocs[row]);
    }

    setValue(row, value){
        let values = this.state.values;
        this.setState({values});
    }

    addRow(){
        this.setState({rows:this.state.rows+1});
    }

    removeRow(){
        let {timeEpocs, timeStrings, values, rows} = this.state;
        timeEpocs[rows] = 0;
        timeStrings[rows] = "";
        values[rows] = undefined;
        rows-=1;
        this.setState({timeEpocs, timeStrings, rows});
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
                        placeholder="Value"
                    />
                </div>
            )
        }
        ret.push(<button onClick={this.addRow.bind(this)}>Add</button>);
        ret.push(<button onClick={this.removeRow.bind(this)}>Remove</button> )
        return <div>{ret}</div>;
    }
}

export default ScheduleInput;