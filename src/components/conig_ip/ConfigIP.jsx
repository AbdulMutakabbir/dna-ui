import React, { useState } from 'react'
import IPut from 'iput';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import LoadingButton from '@mui/lab/LoadingButton';
import ReactJson from 'react-json-view';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './ConfigIP.css';

const ConfigIP = () => {
    const defaultSourceIP = "10.10.36.11"
    const defaultDestinationIP = "10.10.217.11"
    const defaultIsGeneratingConfig = false
    const defaultMapping = {}
    const defaultConfig = ""

    const [sourceIP, setSourceIP] = useState(defaultSourceIP);
    const [destiantionIP, setDestiantionIP] = useState(defaultDestinationIP);
    const [isGeneratingConfig, setIsGeneratingConfig] = useState(defaultIsGeneratingConfig);
    const [mapping, setMapping] = useState(defaultMapping);
    const [config, setConfig] = useState(defaultConfig);

    const onGenerateConfig = () => {

        setMapping(defaultMapping);
        setConfig(defaultConfig);
        var data = JSON.stringify({
            "source_ip": sourceIP,
            "destination_ip": destiantionIP
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/get_updated_config',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setMapping(response.data.mapping);
                setConfig(response.data.config);
                setIsGeneratingConfig(defaultIsGeneratingConfig);
            })
            .catch(function (error) {
                console.log(error);
                setIsGeneratingConfig(defaultIsGeneratingConfig);
            });
    }

    return (
        <div>
            <Grid container >
                <Grid container direction="row" alignItems="center" >
                    <Grid item xs={6}>
                        <Grid container justifyContent="flex-end" alignItems="center">
                            Source IP:
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justifyContent="flex-start" alignItems="center" paddingLeft={3}>
                            <IPut defaultValue={defaultSourceIP} onChange={(ip) => { setSourceIP(ip) }} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" >
                    <Grid item xs={6}>
                        <Grid container justifyContent="flex-end" alignItems="center">
                            Dstination IP:
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justifyContent="flex-start" alignItems="center" paddingLeft={3}>
                            <IPut defaultValue={defaultDestinationIP} onChange={(ip) => { setDestiantionIP(ip) }} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center" padding={2}>
                    <Grid item xs={12}>
                        <LoadingButton
                            loading={isGeneratingConfig}
                            loadingPosition="end"
                            endIcon={<GetAppIcon />}
                            fullWidth={true}
                            color="primary"
                            variant="outlined"
                            onClick={() => {
                                setIsGeneratingConfig(!isGeneratingConfig);
                                onGenerateConfig();
                            }}
                        >
                            Get Updated Switch Config
                        </LoadingButton>
                    </Grid>
                </Grid>

                <Grid container direction="row" alignItems="top" padding={2} className={"processedContainer"}>
                    <Grid item xs={6}>
                        <ReactJson src={mapping} />
                    </Grid>
                    <Grid item xs={6}>
                        <EditTextarea readonly={true} value={config} rows={20} />
                    </Grid>
                </Grid>
            </Grid>




        </div>
    )
}

export default ConfigIP