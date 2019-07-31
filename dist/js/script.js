$(function(){
  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    navText : ["",""],
    autoWidth: false,
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        },
        992:{
            items:3
        },
        1200:{
            items:4
        }
    }
  });
});