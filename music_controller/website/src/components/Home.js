import React, { Component } from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Room from "./Room";
import { 
    BrowserRouter as Router,
    Routes, 
    Route, 
    Link, 
    Redirect 
} from "react-router-dom";

export default class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Router>
                <Routes>
                    <Route path="/join" element={<JoinRoom />} />
                    <Route path="/create" element={<CreateRoom />} />
                    <Route path="/room/:roomId/" element={<Room />} />
                    {/* <Route path="/main">
                        <p>Hello My Friend!</p>
                    </Route> */}
                </Routes>
            </Router>
        );
    }
}
