import { Box, IconButton, useTheme } from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext, tokens } from '../../theme'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

const Topbar = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const colorMode = useContext(ColorModeContext)



	return(
		<Box display='flex' justifyContent='flex-end' p={2}>
			<Box display='flex'>
				<IconButton on onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
					<LightModeOutlinedIcon/>
					):(
					<DarkModeOutlinedIcon/>
					)}
				</IconButton>
			</Box>
		</Box>
					
	)
}

export default Topbar