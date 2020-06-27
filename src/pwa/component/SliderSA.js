import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../assets/scss/SliderSA.scss';

function SliderSA () {

	return (
		<div className="slider-sa">
			<Slider draggable={false} arrows={false} autoplay={true} dots={true}>
				<Link to="/about" className="slider--item">
					<img src={require('../assets/img/banner1.png')} alt="" />
				</Link>
				<Link to="/about" className="slider--item">
					<img src={require('../assets/img/banner2.png')} alt="" />
				</Link>
				<Link to="/about" className="slider--item">
					<img src={require('../assets/img/banner3.png')} alt="" />
				</Link>
			</Slider>
		</div>
	);

}

export default SliderSA;
