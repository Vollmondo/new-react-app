import React from 'react';
import './Comments.css';
import AirQualityComponent from '../../components/AirQuality/AirQuality';

class Comments extends React.Component {
  render() {
    return (
      <div className="comments-form">
        <AirQualityComponent />
      </div>
    );
  }
}

export default Comments;
