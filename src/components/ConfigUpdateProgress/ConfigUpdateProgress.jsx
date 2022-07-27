import React from 'react';
import Steps, { Step } from 'rc-steps'
import 'rc-steps/assets/index.css';
import { Grid } from '@mui/material';

const ConfigUpdateProgress = (props) => {
    return (
        <>
            <Grid container paddingBottom={5}>
                <Grid container direction="row" alignItems="top" className={"processedContainer"}>
                    <Grid item xs={12}>
                        <Steps
                            current={props.currentStep}
                            direction="horizontal"
                            labelPlacement="vertical">
                            <Step title="Extract Source Switch Data" />
                            <Step title="Extract Destination Switch Data" />
                            <Step title="Obtain Mapping and Selection" />
                            <Step title="Finalize Selection" />
                            <Step title="Push Template" />
                        </Steps>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ConfigUpdateProgress;