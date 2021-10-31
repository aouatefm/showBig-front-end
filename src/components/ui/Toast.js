import React, {Component} from 'react';

class Toast extends Component {
    render() {
        return (
            <Toast onClose={() => this.props.setShow(false)} show={this.props.show} delay={3000} autohide className="Success">
                <Toast.Body>{this.props.message}</Toast.Body>
            </Toast>
        );
    }
}

export default Toast;