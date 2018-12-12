import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  withStyles,
  Typography,
  CardActions,
  TextField
} from "@material-ui/core";

const styles = {
  button: {
    backgroundColor: "#2d83bd",
    color: "#fff"
  },
  cardFloatRight: {
    float: "right"
  }
};

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: ""
    };
  }

  onChange(event, key) {
    const value = event.target.value;
    this.setState({ [key]: value });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state);
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.title}
          </Typography>
          <TextField
            className={classes.textField}
            fullWidth
            value={this.state.title}
            onChange={event => this.onChange(event, "title")}
            type={"text"}
            placeholder={"Título"}
          />
          <br />
          <TextField
            className={classes.textField}
            multiline
            fullWidth
            value={this.state.text}
            onChange={event => this.onChange(event, "text")}
            placeholder={"O que está rolando?"}
          />
        </CardContent>

        <CardActions className={classes.cardFloatRight}>
          <Button
            className={classes.button}
            onClick={() => {
              this.setState({ title: "", text: "" });
              this.props.onSubmit(this.state);
            }}
          >
            Postar
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CreatePost);
