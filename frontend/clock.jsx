import React from 'react';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.tickId = setInterval(this.tick,1000)
    }

    componentWillUnmount() {
        clearInterval(this.tickId);
    }

    tick() {
        this.setState({time: new Date()});
    }

    render() {
        let hrs = this.state.time.getHours();
        let mins = this.state.time.getMinutes();
        let secs = this.state.time.getSeconds();

        hrs = (hrs < 10) ? `0${hrs}` : hrs;
        mins = (mins < 10) ? `0${mins}` : mins;
        secs = (secs < 10) ? `0${secs}` : secs;

        return (
            <div className='widget'>
                <h1 className='title'>Clock <i className="icon far fa-clock"></i></h1>
                <div className='clock'>
                    <div className='time'>
                        <span className='clock-detail'>Time: </span>
                        <span>{hrs}:{mins}:{secs} EDT</span>
                    </div>
                    <div className='date'>
                        <span className='clock-detail'>Date: </span> 
                        <span>{this.state.time.toDateString()}</span>
                    </div>
                </div>
            </div>
        )
    };
}