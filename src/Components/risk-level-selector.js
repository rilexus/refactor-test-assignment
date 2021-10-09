import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RiskLevelSelector({ riskLevel = 10, minRiskLevel = 3, maxRiskLevel = 25, onChangeRiskLevel = () => {} }){

    const [selected, setSelected] = useState(riskLevel);

    function onChange(e){
        const newRiskLevel = parseInt(e.target.value);
        setSelected(newRiskLevel);
        onChangeRiskLevel(newRiskLevel);
    }

    function Options(){
        const options = [];
        for(let k=1; k<=maxRiskLevel; ++k) {
            options.push(
                <option key={k} value={k} disabled={k<minRiskLevel}>{k}</option>
            );
        }
        return options;
    }
        
    return (
        <div>
            Risk level:
            <select onChange={onChange} value={selected}>
                <Options />
            </select>
        </div>
    );
}

RiskLevelSelector.propTypes = {
    riskLevel: PropTypes.number,
    minRiskLevel: PropTypes.number,
    maxRiskLevel: PropTypes.number,
    onChangeRiskLevel: PropTypes.func,
};

export default RiskLevelSelector;
