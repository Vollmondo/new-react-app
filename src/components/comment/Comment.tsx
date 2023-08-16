import React from 'react';
import './Comment.css';

interface Props {
  name: string;
  text: string;
}

class Comment extends React.Component<Props> {
  render() {
    return (
      <div className="comment">
        <div className="comment_userName">{this.props.name}</div>
        <div className="comment_text">{this.props.text}</div>
      </div>
    );
  }
}

export default Comment;
