import React from 'react';
import './Comments.css';
import Comment from '../../components/comment/Comment';
import Pack from '../../components/pack/Pack';

interface State{
  countOfSlides: number
}
class Comments extends React.Component<{}, State> {
  constructor (props: {}){
    super(props);
    this.state = {countOfSlides: 0}
  }

  render() {
    return (
      <div className='slider-container'>
        <div className="comments-form">
        {Pack.map((elem, index) => 
          <Comment 
            title ={elem.title} 
            text={elem.text} 
            countOfSlides={this.state.countOfSlides} 
            setSliderState={this.setState.bind(this)}
          />
        )}
        </div>
        <div className='slider-statistic'>
          Общее количество опубликованных слайдов: {this.state.countOfSlides}
        </div>
      </div>
      
    );
  }
}

export default Comments;
