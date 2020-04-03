import React from 'react';

export default class Collapsible extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open:false
        }
    }

    toggle(){
        this.setState({open:!this.state.open});
    }

    render(){
        return <div>
            <div onClick={this.toggle.bind(this)}>{this.state.open?<span>v</span>:<span>^</span>}{this.props.title}</div>
            {this.state.open && this.props.children}
        </div>
    }

}