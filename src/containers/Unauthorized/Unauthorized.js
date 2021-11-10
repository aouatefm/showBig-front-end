import React, {Component} from 'react';

class Unauthorized extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: "center", fontWeight: "900", fontSize: "300px"}}> 403</h1>
                <h1 style={{textAlign: "center",fontWeight: "900",fontSize: "50px"}}>
                    We are sorry your request is <span style={{backgroundColor:"black", color :"#FFFD38"}}>unauthorized</span>
                </h1>
            </div>
        );
    }
}

export default Unauthorized;