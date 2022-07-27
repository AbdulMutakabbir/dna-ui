import React from 'react';
import IPut from 'iput';
import ColumnSelect from 'react-column-select'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import GetAppIcon from '@mui/icons-material/GetApp';
import AdvanceSwitchConfig from '../AdvanceSwitchConfig/AdvanceSwitchConfig';
import 'react-dropdown-tree-select/dist/styles.css'


const SwitchConfig = (props) => {
    return (
        <Grid container paddingBottom={5}>
            <Grid container direction="row" alignItems="top" >
                <Grid item xs={12}>
                    <Grid container justifyContent="flex-start">
                        {props.isSource ? <>Source Port</> : <>Destination Port</>}
                    </Grid>
                </Grid>
                <Grid item xs={12} paddingX={2}>
                    <Grid container justifyContent="flex-start" alignItems="center">
                        IP:
                        <Grid paddingX={2}>
                            {props.disableIP ?
                                <>
                                    {props.ip}
                                </>
                                :
                                <IPut
                                    defaultValue={props.defaultIp}
                                    onChange={(ip) => { props.onChangeIp(ip) }} />
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {
                    props.showPortTypeSelection ?
                        <Grid item xs={12} paddingX={2}>
                            <Grid container justifyContent="flex-center" alignItems="center">
                                <ColumnSelect
                                    options={props.portTypeSelectionOptions}
                                    defaultValue={props.portTypeSelectionDefault}
                                    onChange={props.onChangePortTypeSelection}
                                    labels={{
                                        leftHeader: 'Available Port',
                                        rightHeader: 'Skiped Ports',
                                    }}
                                />
                            </Grid>
                        </Grid>
                        :
                        <></>
                }
                {
                    props.showPortSelection ?
                        <Grid item xs={12} md={6} paddingX={2}>
                            <Grid container direction="row" justifyContent="flex-start">
                                <DropdownTreeSelect data={props.selectedPortsData}
                                    disabled={props.disablePortSelection}
                                    onChange={(value) => { props.onChangeSelectedPort(value, props.isSource) }}
                                // onAction={onAction} onNodeToggle={onNodeToggle} 
                                />
                            </Grid>
                        </Grid>
                        :
                        <></>
                }
                {props.showAdvanceFilter ?
                    <Grid item xs={12} md={6} paddingX={2}>
                        <AdvanceSwitchConfig data={props.advanceFilterData} onChange={props.onChangeAdvancePortSettings} isSource={props.isSource}/>
                    </Grid>
                    :
                    <></>
                }
                {
                    props.showGetDataButton ?
                        <Grid item xs={12} padding={2}>
                            <LoadingButton
                                loading={props.getDataButtonLoading}
                                loadingPosition="end"
                                endIcon={<GetAppIcon />}
                                fullWidth={true}
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                    props.onClickGetDataButton(props.ip, props.isSource);
                                }}
                            >
                                Get {props.isSource ? "Source" : "Destination"} Switch Data
                            </LoadingButton>
                        </Grid>
                        :
                        <></>
                }
            </Grid>
        </Grid>
    )
}

export default SwitchConfig;