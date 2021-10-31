import React, {Component} from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
    height: "500px",

};

export class BlogMap extends Component {
    render() {
        return (
                <Map
                    style={mapStyles}
                    google={this.props.google}
                    zoom={6}
                    initialCenter={{
                        lat: 36.806389,
                        lng: 10.181667
                    }}>

                </Map>
        )
    }
}

export default GoogleApiWrapper({
    // apiKey: ("AIzaSyCFGsoT73Jcdo0BmevPXOjWBorD1vGy41Y")
    apiKey: ("AIzaSyB8BtMRdu9tvtEaHDsoRFKafb3eDeiUcGA")
})(BlogMap);

