import React from 'react';
import Grid from '@mui/material/Grid';
import ReactJson from 'react-json-view';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ConfigPreview = (props) => {
    return (
        <>
            <Grid container paddingBottom={5}>
                <Grid container direction="row" alignItems="top" className={"processedContainer"}>
                    <Grid item xs={12}>
                        <Typography>Switch Config Preview</Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="top" className={"processedContainer"}>
                        <Grid item xs={12} md={6} paddingX={2}>
                            <ReactJson src={props.mapping} />
                        </Grid>
                        <Grid item xs={12} md={6} paddingX={2}>
                            <EditTextarea className={"config-preview"} readonly={true} value={props.config} rows={20} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ConfigPreview;