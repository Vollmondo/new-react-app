import React from 'react';

interface Props {
    title: string;
    text: string;
    isActive: boolean;
}

class SliderItem extends React.Component<Props> {
    render() {
        return (
            <div className='slider-item'>
                <div className="comment_userName">{this.props.title}</div>
                <div className="comment_text">{this.props.text}</div>
            </div>
        );
    }
}

export default SliderItem;