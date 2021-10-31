import Loader from "react-loader-spinner";
import {Component} from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class Spinner extends Component {
    //other logic
    render() {
        return (
            <Loader
                type="Oval"
                color="#EEEE23"
                secondaryColor="Gray"
                height={80}
                width={80}
                style={{display: "flex", position: "relative", justifyContent: "center"}}
                //timeout={3000} //3 secs
            />
        );
    }
}