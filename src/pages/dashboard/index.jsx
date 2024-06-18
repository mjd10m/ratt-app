import { Box } from "@mui/material"
import Header from '../../components/header'

const Dashboard = () => {
    return( 
    <Box>
        <Box display="flex" justifyContent='space-between' alignItems='center'>
            <Box m={"20px"}>
                <Header title='Dashboard' subtitle='Riverview Auto Tag' />
            </Box>  
        </Box>
        
    </Box>
)}

export default Dashboard