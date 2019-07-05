import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                // Add a redirection for logout
                </p>
            </div>
        );
    }
}
