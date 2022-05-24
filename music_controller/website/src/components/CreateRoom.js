import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Button, 
    Grid, 
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel
} from "@material-ui/core"
import { Link } from "react-router-dom";

const navigate = useNavigate();

export default class CreateRoom extends Component{
    defaultVotes = 1;
    defaultRoomName = "room_1"
    constructor(props){
        super(props);
        this.state = {
            roomName: this.defaultRoomName,
            votesToSkip: this.defaultVotes,
            guestCanPause: true
        };
        this.handleCreateRoomButton = this.handleCreateRoomButton.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPause = this.handleGuestCanPause.bind(this);
        this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    }
    handleVotesChange(e){
        this.setState({
            votesToSkip: e.target.value,
        })
    }
    handleRoomNameChange(e){
        this.setState({
            roomName: e.target.value,
        })
    }
    handleGuestCanPause(e){
        this.setState({
            guestCanPause: e.target.value==="true" ? true: false,
        })
    }
    handleCreateRoomButton(e){
        // console.log(this.state)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                room_name: this.state.roomName,
                guest_can_pause: this.state.guestCanPause,
                votes_to_skip: this.state.votesToSkip
            }),
        };
        fetch("/api/create_room", requestOptions)
        .then((response) =>response.json())
        .then((data) => navigate.push("/room/"+ data.room_id + "/"));

    }
    render(){
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                    inputProps={{
                        style: {
                            textAlign: "center",
                        },
                    }}
                    // id="standard-basic"
                    label="room name"
                    // variant="standard"
                    type="text"
                    defaultValue={this.defaultRoomName}
                    onChange={this.handleRoomNameChange}/>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" 
                    onChange={this.handleGuestCanPause}>
                        <FormControlLabel 
                        value="true" 
                        control={<Radio color="primary" />}
                        label="Play/Pause"
                        labelPlacement="bottom"/>
                        <FormControlLabel 
                        value="false" 
                        control={<Radio color="secondary" />}
                        label="No Control"
                        labelPlacement="bottom"/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} 
                    type="number" 
                    defaultValue={this.defaultVotes}
                    inputProps={{
                        min:1,
                        style: {
                            textAlign: "center",
                        }
                    }}
                    onChange={this.handleVotesChange}/>
                    <FormHelperText>
                        <div align="center">Votes required to skip</div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained"
                onClick={this.handleCreateRoomButton}>
                    Create
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" 
                variant="contained" 
                to="/main"
                component={Link}>
                   Back
                </Button>
            </Grid>
        </Grid>
        )
    }
}
