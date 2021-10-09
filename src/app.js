import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './menu';
import RiskLevelSelector from './risk-level-selector';

const Table = lazy(() => import('./table'));
const Chart = lazy(() => import('./chart'));

import { calculateTimeSeries } from './utils';
import cones from './../cones';

export default function App(){
    const [riskLevel, setRiskLevel] = useState(10);
    const getCone = () => cones.filter(cone => cone.riskLevel === riskLevel);
    const initalCone = getCone();
    const [cone, setCone] = useState(initalCone[0]);
    const [showError, setShowError] = useState(false);

    const timeSeries = useMemo(() => {
        if(!cone) return null;
        const { mu, sigma } = cone;
        return calculateTimeSeries({
            mu,
            sigma,
            years: 10,
            initialSum: 10000,
            monthlySum: 200,
            fee: 0.01
        });
    }, [cone])

    function onChangeRiskLevel(riskLevel){
        setRiskLevel(riskLevel);
    }

    useEffect(() => {
        const newCone = getCone()
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
                <Suspense fallback="Loading">
                    <Switch>
                        <Route exact path={["/", "/table"]}>
                            <Table timeSeries={timeSeries}/>
                        </Route>
                        <Route path="/chart">
                            <Chart timeSeries={timeSeries}/>
                        </Route>
                        <Route render={() => <h1>Not found</h1>} />
                    </Switch>
                </Suspense>
            </div>
        </Router>
    );
}