import React from 'react';
import moment from "moment";

export default class TimeInput extends React.Component {
    constructor(props) {
        super(props);
        let startValues = props.startValues ? props.startValues : [];
        let rows = props.rows ? props.rows : 3;
        this.state = {
            rows: rows,
            timeStrings: startValues.map((time)=>{
                return time.format("LT");
            }, []),
            timeEpocs: startValues,
        }
    }

    setTime(index, value){
        let timeStrings = this.state.timeStrings;
        timeStrings[index] = value;
        this.setState({timeStrings});
    }

    finalizeTime(row){
        let timeStrings = this.state.timeStrings;
        let timeEpocs = this.state.timeEpocs;
        let value = this.state.timeStrings[row];
        timeEpocs[row] = moment(value, "LT");
        timeStrings[row] = timeEpocs[row].format("LT");
        this.setState({timeEpocs, timeStrings});
        this.props.onChange(timeEpocs);
    }

    addRow(){
        let {timeEpocs, timeStrings, rows} = this.state;
        timeEpocs.push();
        timeStrings.push();
        rows++;
        this.setState({timeEpocs, timeStrings, rows});
        this.props.onChange(timeEpocs);
    }

    removeRow(){
        let {timeEpocs, timeStrings, rows} = this.state;
        timeEpocs.pop();
        timeStrings.pop();
        rows-=1;
        this.setState({timeEpocs, timeStrings, rows});
        this.props.onChange(timeEpocs);
    }

    render() {
        let ret = [];
        for(let i = 0; i<this.state.rows; i++){
            ret.push(
                <div><input
                    type="text"
                    value={this.state.timeStrings[i]}
                    key={i}
                    onChange={(e)=> {
                        this.setTime(i, e.target.value);
                    }}
                    onBlur={this.finalizeTime.bind(this,i)}
                    placeholder="Time (ie. 5:30 PM)"
                /></div>
            )
        }
        ret.push(<button onClick={this.addRow.bind(this)}>Add</button>);
        ret.push(<button onClick={this.removeRow.bind(this)}>Remove</button> )
        return <div>{ret}</div>
    }
}