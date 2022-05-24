import React, { Component } from "react";
// import { matchPath } from "react-router-dom";


export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 1,
            guestCanPause: false,
            isHost: false,
        };
        // const match = matchPath(this.props.history.location.pathname, {
        //     path: '/room/:roomId/',
        //     exact: true,
        //     strict: false
        // })
        this.roomId = this.props.match.params.roomId;
        this.getRoomDetails();
    }
    getRoomDetails(){
        fetch("/api/get_room" + "?room_id=" + this.roomId).then((response) => response.json()).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host
            });
        });
    }

    render(){
        return (
            <div>
                <p>Votes: { this.state.votesToSkip }</p>
                {/* <p>Room Id: { this.roomId }</p> */}
            </div>
        )
    }
}