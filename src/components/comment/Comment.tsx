import React from 'react';
import './Comment.css';

interface Props {
  title: string;
  text: string;
  countOfSlides:number;
  setSliderState: Function;
}

interface State{
  isPublished: boolean
}
class Comment extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.handlePublish = this.handlePublish.bind(this)
    this.state = { isPublished: false }
  }

  handlePublish(){
    !this.state.isPublished
    ? this.props.setSliderState({
      countOfSlides: this.props.countOfSlides +1
    })
    : this.props.setSliderState({
      countOfSlides: this.props.countOfSlides -1
    })
    this.setState({
      isPublished: !this.state.isPublished,
    });
    
  }

  render() {
    return (
      <div className='container'>
        <div className='isPublished'>
          <p><input id="isPublished" type="checkbox" name="isPublished" value="isPublished" onClick={this.handlePublish}/>Опубликовать</p>
          { this.state.isPublished? 'Опубликовано' : 'Не опубликовано' } 
        </div>
        <div className="comment">
          <div className="comment_userName">{this.props.title}</div>
          <div className="comment_text">{this.props.text}</div>
        </div>
      </div>
      
    );
  }
}

export default Comment;
