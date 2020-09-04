import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Alerts = () => {
    const alerts = useSelector(state => state.alert);
    console.log(alerts);
    return (
        <Fragment>
            {alerts && alerts.length > 0 && alerts.map(alert =>
                <Alert className="fade" dismissible={true} variant={alert.alertType} key={alert.id}>{alert.msg}</Alert>
            )}
        </Fragment>
    )
}

export default Alerts;