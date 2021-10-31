import React from 'react';

const StandardCard = (props) => {
    return (
        <div className="text-center standard-card">
            <img
                src={props.img}
                style={{
                    width:'80%',
                    height:'80%'
                }}
                alt={props.title}
            />
            <h2>{props.title}</h2>
        </div>
    );
};

export default StandardCard; 