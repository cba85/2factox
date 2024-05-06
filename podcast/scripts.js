/* 3D TRANSFORM */

const podcast = document.querySelector('#podcast');

podcast.onmousemove = (e) => {
	podcast.style.webkitTransform = podcast.style.transform = 'rotate3d(10, 180, -6, ' + e.pageX / -20 + 'deg)';
};