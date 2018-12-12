import React, { Component, Fragment } from "react";
import { Typography } from "@material-ui/core";

class Comment extends Component {
  render() {
    return (
      <Fragment style={{ padding: 20 }}>
        <Typography component="p">{this.props.text}</Typography>
      </Fragment>
    );
  }
}

export default Comment;
