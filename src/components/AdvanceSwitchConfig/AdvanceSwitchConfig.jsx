import React, {useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdvanceSwitchConfig = (props) => {

    const [trunkPort, setTrunkPort] = useState(props.data.trunkPort)
    const [onlyShutDown, setonlyShutDown] = useState(props.data.onlyShutDown)

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Advance Setting</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem>
                            <Switch
                                edge="start"
                                checked={trunkPort}
                                onChange={(event) => {
                                    props.onChange('trunkPort', event.target.checked, props.isSource);
                                    setTrunkPort(event.target.checked)
                                }}
                            />
                            <ListItemText id="switch-list-label-wifi" primary="Skip Trunk Ports" />
                        </ListItem>
                        <ListItem>
                            <Switch
                                edge="start"
                                checked={onlyShutDown}
                                onChange={(event) => {
                                    props.onChange('onlyShutDown', event.target.checked, props.isSource);
                                    setonlyShutDown(event.target.checked)
                                }}
                            />
                            <ListItemText id="switch-list-label-bluetooth" primary="Skip if only contains shutdown" />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default AdvanceSwitchConfig;