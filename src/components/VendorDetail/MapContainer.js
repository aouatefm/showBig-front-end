import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
    width: "90%",
    height: "30%"
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: true, // Hides or shows the InfoWindow
        activeMarker: {}, // Shows the active marker upon click
        selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
        zoom: 5,
        markerPosition: {
            lat: null,
            lng: null
        }
    };
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            zoom: 18
        });

    onClose = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={this.state.zoom}
                style={mapStyles}
                initialCenter={{
                    lat: 36.806389,
                    lng: 10.181667
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={"Kenyatta International Convention Centre"}
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        onChange={this.onChange}
                        readOnly="readOnly"
                        value={this.state.address}
                    />
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyB8BtMRdu9tvtEaHDsoRFKafb3eDeiUcGA"
})(MapContainer);
