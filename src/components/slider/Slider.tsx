import React from 'react';
import './Slider.css';
import SliderItem from './SliderItem';
import Pack from '../pack/Pack';

type SliderState = {
    currentIndex: number;
};

type SliderProps = {
    countOfSlides: number;
    setSliderState: (state: { countOfSlides: number }) => void;
};

class Slider extends React.Component<SliderProps, SliderState> {
    constructor(props: SliderProps) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    handlePrev = () => {
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1
        }));
    }

    handleNext = () => {
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1
        }));
    }

    render() {
        const { currentIndex } = this.state;

        return (
            <div className='slider'>
                <div className='slider-btn-x'>
                    <div className='slider-btn-y'>
                        <button className='slider-btn prev' onClick={this.handlePrev}></button>
                    </div>
                </div>
                <div className='slider-wrapper'>
                    {Pack.map((value: { title: string; text: string; }, index: number) => (
                        <SliderItem
                            key={index}
                            title={value.title}
                            text={value.text}
                            isActive={index === currentIndex}
                        />
                    ))}
                </div>
                <div className='slider-btn-x'>
                    <div className='slider-btn-y'>
                        <button className='slider-btn next' onClick={this.handleNext}></button>
                    </div>    
                </div>
            </div>
        );
    }
}

export default Slider;