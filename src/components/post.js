import React, { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardHeader,
  TextField
} from "@material-ui/core";
import ThumbUp from "@material-ui/icons/ThumbUp";
import DeleteIcon from "@material-ui/icons/Delete";
import Comment from "./comment";
import axios from "axios";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    padding: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px"
  },
  cardFloatRight: {
    float: "right"
  },
  textField: {
    width: "100%",
    marginBottom: "5px"
  },
  button: {
    backgroundColor: "#2d83bd",
    color: "#fff"
  },
  iconButtonDelete: {
    float: "right"
  }
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.actualLikes,
      newComment: "",
      comments: []
    };
  }

  onChange(event, key) {
    const value = event.target.value;
    this.setState({ [key]: value });
  }

  componentDidMount() {
    this.readFromStorage();
  }

  onSubmitComment() {
    const newComment = this.state.newComment;
    const comments = this.state.comments;

    comments.push({ text: newComment, post: this.props.time });
    this.saveInStorage();
    this.setState({
      comments,
      newComment: ""
    });
  }

  saveInStorage() {
    const commentArray = this.state.comments;
    localStorage.setItem(
      "comment_" + this.props.time,
      JSON.stringify(commentArray)
    );
  }

  readFromStorage() {
    let commentsSaved = localStorage.getItem("comment_" + this.props.time);
    commentsSaved = JSON.parse(commentsSaved);

    this.setState({ comments: commentsSaved || [] });
  }

  onLike() {
    const likeCount = this.state.likes;
    const newPost = {
      likes: likeCount + 1,
      title: this.props.title,
      text: this.props.children,
      time: this.props.time
    };
    axios
      .put("http://localhost:3000/posts/" + this.props.id, newPost)
      .then(() => {
        this.setState({ likes: likeCount + 1 });
      });
  }

  deletePost() {
    axios.delete("http://localhost:3000/posts/" + this.props.id).then(() => {
      this.props.onDelete(this.props.id);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <IconButton
          className={classes.iconButtonDelete}
          aria-label="Delete"
          onClick={this.deletePost.bind(this)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <CardHeader
          title={this.props.title}
          subheader={moment(this.props.time).fromNow()}
          onClick={() => this.props.navigate("/post/" + this.props.id)}
        />

        <CardContent>
          <Typography component="p">{this.props.children}</Typography>
          <Typography dir="rtl">
            {this.state.likes}
            <IconButton
              onClick={() => this.onLike()}
              color="primary"
              component="span"
            >
              <ThumbUp />
            </IconButton>
          </Typography>
        </CardContent>

        <CardContent>
          {this.state.comments.map(comment => {
            return <Comment text={comment.text} />;
          })}
        </CardContent>

        <CardContent>
          <TextField
            className={classes.textField}
            value={this.state.newComment}
            onChange={event => this.onChange(event, "newComment")}
            placeholder={"Comente algo!"}
          />
          <CardActions className={classes.cardFloatRight}>
            <Button
              className={classes.button}
              onClick={() => this.onSubmitComment()}
            >
              Comentar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Post);
