import React from 'react';


import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import MainListItemsSideBar from './list'
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useTheme} from '@material-ui/core/styles';
import useStyles from "./style";
import Button from "@material-ui/core/Button";
import {
    Switch,
    Route,
    Router,
    useHistory
} from "react-router-dom";
import CheckConnected from "../Controller/CheckConnected";

import Calculator from "../Calculator/CalculatorMain/calculator";
import Biorythme from "../Biorythm/BiorythmMain/biorythm";
import SignUp from "../SignUp/signUp";

function Dashboard(props) {
    let history=useHistory();
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [titleName, setTitleName] = React.useState("Vue d'ensemble");
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        {titleName}
                    </Typography>
                    <Button color="inherit" edge={"end"} onClick={()=> {
                        localStorage.clear();
                        history.push('/')
                    }}>  <Typography  noWrap className={classes.title}>
                        Se déconnecter
                    </Typography></Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <MainListItemsSideBar setTitleName={setTitleName} style={classes}>
                        </MainListItemsSideBar>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <MainListItemsSideBar setTitleName={setTitleName} style={classes}>
                        </MainListItemsSideBar>
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <Switch>
                    <Route path="/mysuperday">

                        <Route path="/mysuperday/calculatrice">
                            <Calculator/>
                        </Route>

                        <Route path="/mysuperday/biorythme">
                            <Biorythme/>
                        </Route>
                        <Route path="/mysuperday/users/signup">
                            <SignUp/>
                        </Route>

                    </Route>
                </Switch>
            </main>
        </div>

    );
}

export default Dashboard;