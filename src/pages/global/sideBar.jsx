import { useState } from "react"
import {ProSidebar, Menu, MenuItem} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme} from '@mui/material'
import { Link } from "react-router-dom"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FeedIcon from '@mui/icons-material/Feed';


const Item = ({title, to, icon, selected, setselected}) => {
    const theme = useTheme()
    const colors = tokens("dark")
    return(
        <MenuItem active={selected === title} style= {{color: colors.grey[100]}} onClick={() => setselected(title)} icon={icon}>
            <Typography>{title}</Typography>
            <Link to = {to}/>
        </MenuItem>
    )
}

const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens("dark")
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState('Dashboard')


    return (
        <Box sx={{
            ".pro-sidebar-inner":{
                background: `${colors.primary[400]} !important`
            },
            '& .pro-icon-wrapper': {
                backgroundColor: "transparent !important"
            },
            "& . pro-inner-item": {
                padding: "5px 35px 5px 20px !important"
            },
            '&.pro-inner-item:hover': {
                color: "#868dfb !important"
            },
            '& .pro-menu-item.active': {
                color: '#6870fa !important'
            } }}
            > 
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape='square'>
                    <MenuItem onClick={()=> setIsCollapsed(!isCollapsed)} icon = {isCollapsed ? <MenuOutlinedIcon/> : undefined} style = {{margin: '10px 0 20px 0',color: colors.grey[100]}}>
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>Michael</Typography>
                                <IconButton onClick={()=> setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon style={{color: colors.grey[100]}}/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {/* Menu Items */}
                    <Box paddingLeft={isCollapsed ? undefined:"4%"}>
                        <Item title= "Dashboard" to = "/" icon = {<HomeOutlinedIcon/>} selected={selected} setselected={setSelected}/>
                        <Item title= "Customer Intake" to = "/customerIntake" icon = {<FeedIcon/>} selected={selected} setselected={setSelected}/>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}


export default Sidebar