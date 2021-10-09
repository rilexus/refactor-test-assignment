import React from 'react';
import { Link } from "react-router-dom";

export default function Menu() {

    return (
        <nav>
            <p><Link to="/table">Table</Link></p>
            <p><Link to="/chart">Chart</Link></p>
        </nav>
    );
}
