'use strict';

class Slider {
	#isMouseDown = false;

	constructor(wrap) {
		this.sliderWrap = document.querySelector(wrap);
	}

	get sliders() {
		return this.sliderWrap.querySelectorAll('.slider');
	}

	generateTitle() {
		const title = `<span>&#10229; Потяни &#10230;</span>`;
		this.sliders.forEach(elem => elem.insertAdjacentHTML('beforeEnd', title));
	}

	getInterest(a, b) {
		return (a / b * 100) + '%';
	}

	startResizePic(e) {
		const t = e.target.closest('.slider');
		const x = e.offsetX;

		if (t) {
			this.#isMouseDown = (!this.#isMouseDown) ? true : false;
			t.firstElementChild.style.width = this.getInterest(x, t.offsetWidth);
		}
	}

	resizePic(e) {
		if (!this.#isMouseDown) {
			return
		};

		const t = e.target.closest('.slider');
		const x = e.offsetX;

		if (t) {
			t.firstElementChild.style.width = this.getInterest(x, t.offsetWidth);
			t.lastElementChild.style.left = this.getInterest(x, t.offsetWidth);
		}
	}

	stopResizePic(e) {
		if (!e.target.closest('.slider')) {
			this.#isMouseDown = false;
		}
	}

	init() {
		this.generateTitle();
		this.sliderWrap.addEventListener('mousedown', this.startResizePic.bind(this));
		this.sliderWrap.addEventListener('mousemove', this.resizePic.bind(this));
		this.sliderWrap.addEventListener('mouseleave', this.stopResizePic.bind(this), true);
		this.sliderWrap.addEventListener('mouseup', this.stopResizePic.bind(this));
	}
}

new Slider('.wrapper').init();