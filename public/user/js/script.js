let searchForm = document.querySelector('.header .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.header .navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next(){
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev(){
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}
// add the map
let map;
const aastu = {lat: 8.885334995007733,
               lng: 38.80968902363218}
const launge = {lat: 8.885308078414557,
				lng: 38.81065170942683	}			
function initMap() {
map = new google.maps.Map(
document.getElementById("map"), {
              center: aastu,
				zoom: 17.56,	
				mapId: "66c15665aa02009"
});	
				const marker = new google.maps.Marker({
				position:launge,
				label: "ZEMEN OPTOMETRY",
		       map: map,
			});
			
}

		
	
		