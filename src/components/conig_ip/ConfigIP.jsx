import React, { useState } from 'react'
import IPut from 'iput';

import Grid from '@mui/material/Grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import LoadingButton from '@mui/lab/LoadingButton';

const ConfigIP = () => {

    const defaultSourceIP = "192.168.0.0"
    const defaultDestinationIP = "192.168.1.1"
    const defaultIsGeneratingConfig = false

    const [sourceIP, setSourceIP] = useState(defaultSourceIP);
    const [destiantionIP, setDestiantionIP] = useState(defaultDestinationIP);
    const [isGeneratingConfig, setIsGeneratingConfig] = useState(defaultIsGeneratingConfig)

    return (
        <div>
            <Grid container padding={5}>
                <Grid container direction="row" alignItems="center" padding={2}>
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

                <Grid container direction="row" alignItems="center" padding={1}>
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
                            onClick={()=>{setIsGeneratingConfig(!isGeneratingConfig)}}
                        >
                            Get Updated Switch Config
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>




        </div>
    )
}

export default ConfigIP