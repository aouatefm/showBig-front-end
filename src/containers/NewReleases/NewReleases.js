import React from 'react';
import Card from '../../components/Card/Card';
import "./NewReleases.css";

class NewReleases extends React.Component{
    render() {
        return (
            <div className="container">
                <h3 className="style">NEW RELEASES</h3>
                <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://i.insider.com/578e9e4588e4a77c708b8db1?width=1100&format=jpeg&auto=webp"/></div>
            </div>

        )
    }
}

export default NewReleases;