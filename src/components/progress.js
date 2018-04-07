import React from 'react';
import {jPlayer} from 'jplayer';
import '../style/progress.less';

let duration = null;
class Progress extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            progress:0,
            volume:0
        };
    };
    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate, function(e){
            duration=e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.status.volume
            })
        }.bind(this))
    };
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    };
    
    changeProgress(e){
        let progressBar=this.refs.progressBar;
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        $('#player').jPlayer('play', duration * progress);
    };
    render(){
        return(
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
                <div className="progress" style={{width:`${this.state.progress}%`,background:this.props.barColor}}></div>
            </div>
        );
    };
}
Progress.defaultProps={
    barColor:'#2f9842'
}
export default Progress;