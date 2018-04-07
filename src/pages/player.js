import React from 'react';
import Progress from '../components/progress';
import { MUSIC_LIST } from '../config/music_list';

export default class Player extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentMusicItem : MUSIC_LIST[1]
        };
    };
    componentDidMount(){
        var music_file=this.state.currentMusicItem.file.toString();
        $('#player').jPlayer({
            ready: function(){
                $(this).jPlayer('setMedia',{
                    mp3:music_file
                });
                // .jPlayer('play')
            },
            supplied: 'mp3',
            wmode:'window'
        });
    }
    render(){
        return(
            <div className="pages-player">
                <div className="progress-title">{this.state.currentMusicItem.title}</div>
                <div className="progress-artist">{this.state.currentMusicItem.artist}</div>
                <img className="progress-cover" src={this.state.currentMusicItem.cover} />
                <Progress 
                    currentMusic={this.state.currentMusicItem}
                    barColor='blue'
                >
                </Progress>
            </div>
        )
    }
}