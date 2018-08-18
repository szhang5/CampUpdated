window.onscroll = function changeNav() {
  var nav = document.querySelector('nav');
  if (window.pageYOffset > 400) {
    nav.className = 'sticky';
  } else {
    nav.className = '';
  }
}

document.querySelector('.js--nav-icon').addEventListener('click', function () {
  document.querySelector('.js--nav-icon i').classList.toggle('ion-close-round');
  document.querySelector('.js--nav-icon i').classList.toggle('ion-navicon-round');

  if (document.querySelector('.main-nav').classList.contains('is-visible')) {
    // document.querySelector('.main-nav').style.display = 'none';
    window.setTimeout(function () {
      document.querySelector('.main-nav').classList.remove('is-visible', 'show-slow');
    }, 200);
    
  } else {
    var elem = document.querySelector('.main-nav');
    var getHeight = function () {
      elem.style.display = 'block'; // Make it visible
      var height = elem.scrollHeight + 'px'; // Get it's height
      elem.style.display = ''; //  Hide it again
      return height;
    };
  
    var height = getHeight(); // Get the natural height
    elem.classList.add('is-visible'); // Make the element visible
    elem.style.height = height; // Update the max-height
  
    // Once the transition is complete, remove the inline max-height so the content can scale responsively
    window.setTimeout(function () {
      elem.style.height = '';
    }, 350);
    // document.querySelector('.main-nav').style.display = 'block';
    // window.setTimeout(function () {
    //   document.querySelector('.main-nav').classList.add('is-visible', 'show-slow');
    // }, 200);
    
    // document.querySelector('.main-nav').style.transition = "height 2000ms ease-in-out";
  }
  
});