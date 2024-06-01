import { useState } from "react"
import {ProSidebar, Menu, MenuItem} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme} from '@mui/material'
import { Link } from "react-router-dom"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState('Dashboard')


    return (
        <Box sx={{
            '&.pro-sidebar-inner':{
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
                                <Typography>Michael</Typography>
                                <IconButton>
                                    <MenuOutlinedIcon/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </Box>
    )
}


export default Sidebar