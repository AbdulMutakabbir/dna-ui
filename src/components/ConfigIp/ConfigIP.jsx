import React, { useState } from 'react'
import axios from 'axios';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import ReactJson from 'react-json-view';
import { EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import './ConfigIP.css';
import GetAppIcon from '@mui/icons-material/GetApp';
import SwitchConfig from '../SwitchConfig/SwitchConfig';
import ConfigPreview from '../ConfigPreview/ConfigPreview';
import ConfigUpdateProgress from '../ConfigUpdateProgress/ConfigUpdateProgress';

const ConfigIP = () => {
    const defaultSourceSkipPorts = [
        { value: '1', label: 'GigabitEthernet' },
    ]
    const defaultDestinationSkipPorts = [
        { value: '1', label: 'TenGigabitEthernet' },
        { value: '2', label: 'AppGigabitEthernet' },
        { value: '3', label: 'FortyGigabitEthernet' },
    ]
    const defaultAdvanceSourcePortSettings = {
        'trunkPort': true,
        'onlyShutDown': true,
    }
    const defaultAdvanceDestinationPortSettings = {
        'trunkPort': true,
        'onlyShutDown': true,
    }
    const defaultSourceIP = "10.10.36.11"
    const defaultDestinationIP = "10.10.217.11"
    const defaultSourceData = []
    const defaultDestinationData = []
    const defaultIsGeneratingConfig = false
    const defaultMapping = {}
    const defaultConfig = ""
    const defaultIsSoucreDataExtracted = false
    const defaultIsDestinationDataExtracted = false
    const defaultSelectedSourceSkipPorts = []
    const defaultSelectedDestinationSkipPorts = defaultDestinationSkipPorts
    const defaultCurrentStep = 0

    const [sourceIP, setSourceIP] = useState(defaultSourceIP);
    const [sourceData, setSourceData] = useState(defaultSourceData);
    const [destiantionIP, setDestiantionIP] = useState(defaultDestinationIP);
    const [destinationData, setDestinationData] = useState(defaultDestinationData);
    const [isSourceDataExtracted, setIsSourceDataExtracted] = useState(defaultIsSoucreDataExtracted);
    const [isDestinationDataExtracted, setIsDestinationDataExtracted] = useState(defaultIsDestinationDataExtracted);
    const [selectedSourceSkipPorts, setSelectedSourceSkipPorts] = useState(defaultSelectedSourceSkipPorts);
    const [selectedDestinationSkipPorts, setSelectedDestinationSkipPorts] = useState(defaultSelectedDestinationSkipPorts);
    const [isGeneratingConfig, setIsGeneratingConfig] = useState(defaultIsGeneratingConfig);
    const [advanceSourcePortSettings, setAdvanceSourcePortSettings] = useState(defaultAdvanceSourcePortSettings)
    const [advanceDestinationPortSettings, setAdvanceDestinationPortSettings] = useState(defaultAdvanceDestinationPortSettings)
    const [mapping, setMapping] = useState(defaultMapping);
    const [config, setConfig] = useState(defaultConfig);
    const [currentStep, setCurrentStep] = useState(defaultCurrentStep);

    const onGenerateConfig = () => {

        setMapping(defaultMapping);
        setConfig(defaultConfig);
        var data = JSON.stringify({
            "update_ip_data": {
                "source_ip": sourceIP,
                "destination_ip": destiantionIP
            },
            "selected_ports": {
                "source": getSelectedPorts(sourceData),
                "destination": getSelectedPorts(destinationData)
            },
            "advance_filter": {
                "source_onlyShutDown": advanceSourcePortSettings.onlyShutDown,
                "source_trunkPort": advanceSourcePortSettings.trunkPort,
                "destination_onlyShutDown": advanceDestinationPortSettings.onlyShutDown,
                "destination_trunkPort": advanceDestinationPortSettings.trunkPort,
            }
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
                setCurrentStep(2);
                setIsGeneratingConfig(defaultIsGeneratingConfig);
            })
            .catch(function (error) {
                console.log(error);
                setIsGeneratingConfig(defaultIsGeneratingConfig);
            });
    }

    const onGetConfig = (ip, isSource) => {
        setIsGeneratingConfig(!isGeneratingConfig);

        var dropPortList = []

        if (isSource) {
            setSourceData(defaultSourceData);
            selectedSourceSkipPorts.forEach(dropPort => dropPortList.push(dropPort.label))
        }
        else {
            setDestinationData(defaultDestinationData);
            selectedDestinationSkipPorts.forEach(dropPort => dropPortList.push(dropPort.label))
        }

        var data = JSON.stringify({
            "ip_data": { "ip": ip },
            "skip_port_list": {
                "port_types": dropPortList
            }
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/config',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                if (isSource) {
                    setSourceData(response.data);
                    setIsSourceDataExtracted(true);
                    setCurrentStep(0);
                    setIsGeneratingConfig(defaultIsGeneratingConfig);
                }
                else {
                    setDestinationData(response.data);
                    setIsDestinationDataExtracted(true);
                    setCurrentStep(1);
                    setIsGeneratingConfig(defaultIsGeneratingConfig);
                }
            })
            .catch(function (error) {
                console.log(error);
                if (isSource) {
                    setIsSourceDataExtracted(defaultIsSoucreDataExtracted)
                }
                else {
                    setIsDestinationDataExtracted(defaultIsDestinationDataExtracted);
                }
                setIsGeneratingConfig(defaultIsGeneratingConfig);
            });
    }

    const onChangeSelectedSourceSkipPorts = (values) => {
        setSelectedSourceSkipPorts(values)
    }

    const onChangeSelectedDestinationSkipPorts = (values) => {
        setSelectedDestinationSkipPorts(values)
    }

    const onChangeAdvancePortSettings = (setting, value, isSource) => {
        var data = isSource ? advanceSourcePortSettings : advanceDestinationPortSettings

        data[setting] = value

        isSource ? setAdvanceSourcePortSettings(data) : setAdvanceDestinationPortSettings(data)
    }

    const onChangeTreeDropdown = (value, isSource) => {
        var data = isSource ? sourceData : destinationData

        if (value._depth === 0) {
            data.find(configs => configs.label = value.label).children.forEach((config) => config.checked = value.checked)
            data.find(configs => configs.label = value.label).checked = value.checked
        }
        else {
            data.forEach((configs) => {
                configs.children.forEach((config) => {
                    if (config.label === value.label) {
                        config.checked = value.checked
                        if (value.checked === false) {
                            configs.checked = false
                        }
                    }
                })
            })

            data.forEach((configs) => {
                if (configs.children.every((config) => config.checked === true)) {
                    configs.checked = true
                }
            })
        }
        isSource ? setSourceData(data) : setDestinationData(data)
    }

    const getSelectedPorts = (data) => {
        var selection = []
        data.forEach((configs) => {
            configs.children.forEach((config) => {
                if (config.checked === true) {
                    selection.push(config.label)
                }
            })
        })
        return selection
    }

    return (
        <>
            <ConfigUpdateProgress
                currentStep={currentStep} />
            <SwitchConfig
                isSource={true}
                disableIP={isSourceDataExtracted | isGeneratingConfig}
                ip={sourceIP}
                defaultIp={sourceIP}
                onChangeIp={setSourceIP}
                showPortTypeSelection={!(isSourceDataExtracted || isGeneratingConfig)}
                portTypeSelectionOptions={defaultSourceSkipPorts}
                portTypeSelectionDefault={[]}
                onChangePortTypeSelection={onChangeSelectedSourceSkipPorts}
                showPortSelection={isSourceDataExtracted && (currentStep <= 2)}
                selectedPortsData={sourceData}
                disablePortSelection={isGeneratingConfig}
                onChangeSelectedPort={onChangeTreeDropdown}
                showAdvanceFilter={isSourceDataExtracted && (currentStep <= 2)}
                advanceFilterData={advanceSourcePortSettings}
                onChangeAdvancePortSettings={onChangeAdvancePortSettings}
                onClickGetDataButton={onGetConfig}
                showGetDataButton={!isSourceDataExtracted}
                getDataButtonLoading={isGeneratingConfig}
            />
            {isSourceDataExtracted ?
                <SwitchConfig
                    isSource={false}
                    disableIP={isDestinationDataExtracted | isGeneratingConfig}
                    ip={destiantionIP}
                    defaultIp={destiantionIP}
                    onChangeIp={setDestiantionIP}
                    showPortTypeSelection={!(isDestinationDataExtracted || isGeneratingConfig)}
                    portTypeSelectionOptions={defaultDestinationSkipPorts}
                    portTypeSelectionDefault={defaultDestinationSkipPorts}
                    onChangePortTypeSelection={onChangeSelectedDestinationSkipPorts}
                    showPortSelection={isDestinationDataExtracted && (currentStep <= 2)}
                    selectedPortsData={destinationData}
                    disablePortSelection={isGeneratingConfig}
                    onChangeSelectedPort={onChangeTreeDropdown}
                    showAdvanceFilter={isDestinationDataExtracted && (currentStep <= 2)}
                    advanceFilterData={advanceDestinationPortSettings}
                    onChangeAdvancePortSettings={onChangeAdvancePortSettings}
                    onClickGetDataButton={onGetConfig}
                    showGetDataButton={!isDestinationDataExtracted}
                    getDataButtonLoading={isGeneratingConfig}
                />
                :
                <></>
            }
            {isSourceDataExtracted ?
                <>
                    {isDestinationDataExtracted ? <>

                        {(currentStep == 1) || (currentStep == 2) ?
                            <Grid container direction="row" alignItems="top">
                                <Grid item xs={12} padding={1}>
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
                            :
                            <></>
                        }
                        {
                            (currentStep === 2) && (!isGeneratingConfig) ?
                                <ConfigPreview mapping={mapping} config={config} />
                                :
                                <></>
                        }
                        {
                            (currentStep == 2) && (!isGeneratingConfig) ?
                                <LoadingButton
                                    loading={isGeneratingConfig}
                                    loadingPosition="end"
                                    endIcon={<GetAppIcon />}
                                    fullWidth={true}
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => {
                                        setCurrentStep(3);
                                    }}
                                >
                                    Confirm Selection
                                </LoadingButton>
                                :
                                <></>
                        }
                        {
                            (currentStep ==3) ?
                                <LoadingButton
                                    loading={isGeneratingConfig}
                                    loadingPosition="end"
                                    endIcon={<GetAppIcon />}
                                    fullWidth={true}
                                    color="primary"
                                    variant="outlined"
                                    onClick={() => {
                                        setCurrentStep(4);
                                    }}
                                >
                                    Push Template Into DNAC
                                </LoadingButton>
                                :
                                <></>
                        }
                    </> : <></>}

                </> :
                <>
                </>
            }
        </>
    )
}

export default ConfigIP