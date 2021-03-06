import React, { Component, Fragment } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Post from "./post";
import CreatePost from "./createPost";
import axios from "axios";
import Header from "./Header";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    padding: "20px",
    marginLeft: "auto",
    width: "40%",
    marginRight: "auto",
    marginTop: "10px"
  }
});

class PostView extends Component {
  constructor() {
    super();
    this.state = {
      postArray: []
    };
  }

  componentDidMount() {
    console.log("Requisição feita");
    axios.get("http://localhost:3000/posts").then(response => {
      console.log("Requisição completa");
      this.setState({ postArray: response.data });
    });
    console.log("Depois da requisição");
  }

  onSubmitPost(postObject) {
    let postArray = this.state.postArray;

    // Adicionando um tempo no post
    postObject.time = new Date().getTime();

    axios.post("http://localhost:3000/posts", postObject).then(response => {
      postArray.push(response.data);
      this.setState({ postArray: postArray });
    });
  }

  onPostDelete(id) {
    let postArray = this.state.postArray;
    postArray = postArray.filter(post => post.id !== id);

    this.setState({ postArray: postArray });
  }

  render() {
    const { classes } = this.props;
    const postArray = this.state.postArray.sort((a, b) => b.time - a.time);
    if (postArray.length < 1) {
      return (
        <Fragment>
          <Header />
          <Card className={classes.card}>
            <CreatePost
              title={"LocalHost Post"}
              onSubmit={this.onSubmitPost.bind(this)}
            />
          </Card>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Header />
        <Card className={classes.card}>
          <CreatePost
            title={"LocalHost Post"}
            onSubmit={this.onSubmitPost.bind(this)}
          />
          {postArray.map((post, index) => {
            return (
              <Post
                key={index}
                actualLikes={post.likes}
                id={post.id}
                onDelete={id => this.onPostDelete(id)}
                title={post.title}
                navigate={route => this.props.history.push(route)}
                time={post.time}
              >
                {post.text}
              </Post>
            );
          })}
        </Card>
      </Fragment>
    );
  }
}

export default withStyles(styles)(PostView);
