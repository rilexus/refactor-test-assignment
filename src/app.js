import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './menu';
import RiskLevelSelector from './risk-level-selector';
import Table from './table';
import Chart from './chart';
import { calculateTimeSeries } from './utils';
import cones from './../cones';

export default function App(){
    const [riskLevel, setRiskLevel] = useState(10)

    const initalCone = cones.filter(cone => cone.riskLevel === riskLevel)
    const [cone, setCone] = useState(initalCone[0])

    const [showError, setShowError] = useState(false)

    const timeSeries = useMemo(() => {
        if(!cone) return null;
        const { mu, sigma } = cone
        return calculateTimeSeries({
            mu,
            sigma,
            years: 10,
            initialSum: 10000,
            monthlySum: 200,
            fee: 0.01
        })
    }, [cone])

    function onChangeRiskLevel(riskLevel){
        setRiskLevel(riskLevel);
    }

    useEffect(() => {
        const newCone = cones.filter(cone => cone.riskLevel == riskLevel)
        if(newCone.length > 0){
            setCone(newCone[0]);
            setShowError(false);
        }else{
            setShowError(true);
        }
    }, [riskLevel])

    return (
        <Router>
            <div>
                <Menu/>
                <RiskLevelSelector riskLevel={riskLevel} onChangeRiskLevel={onChangeRiskLevel}/>
                {showError && <p>Ooops...Try another Risk level.</p>}
                <Switch>
                    <Route exact path={["/", "/table"]}>
                        <Table timeSeries={timeSeries}/>
                    </Route>
                    <Route path="/chart">
                        <Chart timeSeries={timeSeries}/>
                    </Route>
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </div>
        </Router>
    );
}