import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppData from './AppData'

const Header = () => (
<>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6">
                Crazy 8s
            </Typography>
        </Toolbar>
    </AppBar>
</>
)

export default Header;