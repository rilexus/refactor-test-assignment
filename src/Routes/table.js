import React from 'react';
import PropTypes from 'prop-types';
function Table({ timeSeries }){

    const months = timeSeries.median.map((v, idx) => idx);
    const dataGood = timeSeries.upper95.map(v => v.y);
    const dataMedian = timeSeries.median.map(v => v.y);
    const dataBad = timeSeries.lower05.map(v => v.y);

    const TableRows = () => months.map((entry, idx) => (
        <tr key={idx}>
            <td>{entry}</td>
            <td>{dataGood[idx]}</td>
            <td>{dataMedian[idx]}</td>
            <td>{dataBad[idx]}</td>
        </tr>
    ));

    const TableHeader = () => (
        <tr>
            <th key="month">month</th>
            <th key="good">good</th>
            <th key="median">median</th>
            <th key="bad">bad</th>
        </tr>
    );

    return (
        <section>
            <table>
                <thead>
                    <TableHeader />
                </thead>
                <tbody>
                    <TableRows />
                </tbody>
            </table>
        </section>
    );
}


Table.propTypes = {
    timeSeries: PropTypes.object,
};

export default Table;
