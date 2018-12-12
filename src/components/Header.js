import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from "../dist/image/localhost-white.png";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  bar: {
    backgroundColor: "#3284bb"
  },
  logo: {
    width: "100px",
    marginTop: "5px"
  }
};

function Header(props) {
  const { classes } = props;
  return (
    <AppBar position="static" color="default" className={classes.bar}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          <a href="../">
            <img src={logo} className={classes.logo} />
          </a>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
