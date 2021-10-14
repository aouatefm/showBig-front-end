import React, {Component} from 'react';
import './StickyNotes.css'

class StickyNotes extends Component {
    render() {
        return (
            <div className="sticky-container" >
                <div className="sticky-outer">
                    <div className="sticky">
                        <svg width="0" height="0">
                            <defs>
                                <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
                                    <path
                                        d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
                                        stroke-linejoin="round"
                                        stroke-linecap="square"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <div className="sticky-content" style={{padding :'20px'}}>
                            {this.props.notes}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StickyNotes;