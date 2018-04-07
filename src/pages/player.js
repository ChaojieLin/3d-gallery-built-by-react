import React from 'react';
import Progress from '../components/progress';
import { MUSIC_LIST } from '../config/music_list';

let duration = null;
export default class Player extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            progress:0,
            volume:0,
            isPlay:true,
            currentMusicItem : MUSIC_LIST[0]
        };
    };
    componentDidMount(){
        let music_file=this.state.currentMusicItem.file.toString();
        $('#player').jPlayer({
            ready: function(){
                $(this).jPlayer('setMedia',{
                    mp3:music_file
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode:'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate, function(e){
            duration=e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100
            })
        }.bind(this))
    };
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    };
    onProgressChange(progress){
        $('#player').jPlayer(this.state.isPlay?'play':'pause', duration * progress);
    };
    onVolumeChange(progress){
        $('#player').jPlayer('volume',progress);
        //updating volume without refresh webpage
        if(this.state.isPlay){
            $('#player').jPlayer('play');
        }else{
            $('#player').jPlayer('play');
            $('#player').jPlayer('pause');
        }
    };
    play(){
        if(this.state.isPlay){
            $('#player').jPlayer('pause');
        }else{
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        })
    };
    render(){
        return(
            <div className="pages-player">
                <div className="progress-title">{this.state.currentMusicItem.title}</div>
                <div className="progress-artist">{this.state.currentMusicItem.artist}</div>
                <img className="progress-cover" src={this.state.currentMusicItem.cover} />
                <Progress
                    onProgressChange={this.onVolumeChange.bind(this)}
                    barColor='blue'
                    progress={this.state.volume}
                >
                </Progress>
                <Progress 
                    onProgressChange={this.onProgressChange.bind(this)}
                    progress={this.state.progress}
                >
                </Progress>
                <div className={`${this.isPlay?'pause':'play'}`} onClick={this.play.bind(this)}>
                    {this.isPlay?'pause':'play'}
                </div>
            </div>
        )
    }
}