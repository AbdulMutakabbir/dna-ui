import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import ConfigIP from '../components/ConfigIp/ConfigIP';
import SwitchFilter from '../components/SwitchFilter/SwitchFilter';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const PageHome = (props) => {

    const [homePageTab, setHomePageTab] = useState(0)

    const handleHomeTabChange = (event, tabValue) => {
        setHomePageTab(tabValue);
    }

    const setTabAttributes = (index) => {
        return {
            'id': `tab-home-${index}`,
            'aria-controls': `tabpanel-home-${index}`,
        };
    }

    return (
        <>
            <Box mx={2} mt={3} sx={{ border: 1, borderColor: 'divider'}}>
                <Tabs value={homePageTab} onChange={handleHomeTabChange} aria-label="tabs-home">
                    <Tab label="DNAC" {...setTabAttributes(0)} />
                    <Tab label="Switch Filter" {...setTabAttributes(1)} />
                    <Tab label="Future Project 2" {...setTabAttributes(2)} />
                </Tabs>
            </Box>
            <Box mx={2} sx={{ border: 1, borderColor: 'divider' }}>
                <TabPanel value={homePageTab} index={0}>
                    <ConfigIP/>
                </TabPanel>
                <TabPanel value={homePageTab} index={1}>
                    <SwitchFilter/>
                </TabPanel>
                <TabPanel value={homePageTab} index={2}>
                    Hello! wil see you soon here...
                </TabPanel>
            </Box>
        </>
    )
}

export default PageHome