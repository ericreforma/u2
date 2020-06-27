import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../assets/scss/TopSlider.scss';

function NextArrow (props) {

	const { style, onClick } = props;

	return (
		<button
			className={`arrow arrow-right`}
			style={{ ...style, display: "block", background: "red" }}
			onClick={onClick}>
			<svg width="18px" height="28px" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M16.5861 15.3224L5.32106 26.5874C4.54244 27.366 3.28341 27.366 2.51308 26.5874L0.641089 24.7154C-0.137525 23.9368 -0.137525 22.6778 0.641089 21.9075L8.62602 13.9225L0.641089 5.9376C-0.137525 5.15898 -0.137525 3.89995 0.641089 3.12962L2.50479 1.24106C3.28341 0.462451 4.54244 0.462451 5.31277 1.24106L16.5778 12.5061C17.3647 13.2847 17.3647 14.5438 16.5861 15.3224Z" />
			</svg>
		</button>
	);

}

function PrevArrow (props) {

	const { style, onClick } = props;

	return (
		<button
			className={`arrow arrow-left`}
			style={{ ...style, display: "block", background: "green" }}
			onClick={onClick}>
			<svg width="18px" height="28px" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.756666 15.3224L12.0217 26.5874C12.8003 27.366 14.0594 27.366 14.8297 26.5874L16.7017 24.7154C17.4803 23.9368 17.4803 22.6778 16.7017 21.9075L8.71675 13.9225L16.7017 5.9376C17.4803 5.15898 17.4803 3.89995 16.7017 3.12962L14.838 1.24106C14.0594 0.462451 12.8003 0.462451 12.03 1.24106L0.764949 12.5061C-0.0219477 13.2847 -0.0219482 14.5438 0.756666 15.3224V15.3224Z" />
			</svg>
		</button>
	);

}

function TopSlider () {

	const settings = {
		dots: true,
		autoplay: true,
		draggable: false,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		appendDots: dots => <div className="slider-dots">{dots}</div>,
	};

	return (
		<div className="top-slider">
			<Slider {...settings}>
				<Link to="/about" className="slider--item">
					<img src={require('../pwa/assets/img/slider/item/banner-image1.png')} alt="" />
				</Link>
				<Link to="/about" className="slider--item">
					<img src={require('../pwa/assets/img/slider/item/banner-image2.png')} alt="" />
				</Link>
				<Link to="/about" className="slider--item">
					<img src={require('../pwa/assets/img/slider/item/banner-image3.png')} alt="" />
				</Link>
			</Slider>
			{/* <div className="slider-arrows">
				<button className="arrow arrow-left">
					<svg width="18px" height="28px" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.756666 15.3224L12.0217 26.5874C12.8003 27.366 14.0594 27.366 14.8297 26.5874L16.7017 24.7154C17.4803 23.9368 17.4803 22.6778 16.7017 21.9075L8.71675 13.9225L16.7017 5.9376C17.4803 5.15898 17.4803 3.89995 16.7017 3.12962L14.838 1.24106C14.0594 0.462451 12.8003 0.462451 12.03 1.24106L0.764949 12.5061C-0.0219477 13.2847 -0.0219482 14.5438 0.756666 15.3224V15.3224Z" />
					</svg>
				</button>
				<button className="arrow arrow-right">
					<svg width="18px" height="28px" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.5861 15.3224L5.32106 26.5874C4.54244 27.366 3.28341 27.366 2.51308 26.5874L0.641089 24.7154C-0.137525 23.9368 -0.137525 22.6778 0.641089 21.9075L8.62602 13.9225L0.641089 5.9376C-0.137525 5.15898 -0.137525 3.89995 0.641089 3.12962L2.50479 1.24106C3.28341 0.462451 4.54244 0.462451 5.31277 1.24106L16.5778 12.5061C17.3647 13.2847 17.3647 14.5438 16.5861 15.3224Z" />
					</svg>
				</button>
			</div>
			<div className="slider-dots">
				<i className="active"></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
				<i></i>
			</div>
			<div className="slide">
				<div className="text-content">
					<BlockHead name="標題 標題" />
					<p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et d</p>
					<button>更多細節</button>
				</div>
				<div className="slide-picture"></div>
			</div> */}
		</div>
	);

}

export default TopSlider;
