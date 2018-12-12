import React, { Component, Fragment } from "react";
import Post from "./post";
import axios from "axios";
import Header from "./Header";
import { Card, withStyles } from "@material-ui/core";

const styles = {
  card: {
    padding: "20px",
    marginLeft: "auto",
    width: "40%",
    marginRight: "auto",
    marginTop: "10px"
  }
};

class PostDetails extends Component {
  constructor() {
    super();
    this.state = {
      post: null,
      error: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/posts/" + this.props.match.params.id)
      .then(response => {
        this.setState({ post: response.data });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  onDeletePost() {
    this.props.history.push("/");
  }

  render() {
    const { classes } = this.props;
    if (!this.state.post) {
      return (
        <Fragment>
          Loading
          {this.state.error ? <p>{this.state.error.message}</p> : null}
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Header />
        <Card className={classes.card}>
          <Post
            id={this.state.post.id}
            title={this.state.post.title}
            onDelete={() => this.onDeletePost()}
            navigate={route => this.props.history.push(route)}
            time={this.state.post.time}
          >
            {this.state.post.text}
          </Post>
          {this.state.error ? <p>OCORREU UM ERRO</p> : null}
        </Card>
      </Fragment>
    );
  }
}

export default withStyles(styles)(PostDetails);
