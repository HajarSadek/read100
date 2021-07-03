/*!
* Start Bootstrap - Stylish Portfolio v6.0.2 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-times');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-times');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-times');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
var booktext
var booksumm
function savebook() {
    booktext = document.getElementById("book").value;
    booksumm = findMostFrequent(booktext,100)
    document.getElementById("summ").innerText = booksumm.join(" ");
};

const findMostFrequent = (str = '', num = 1) => {
    const strArr = str.split(' ');
    const map = {};
    strArr.forEach(word => {
       if(map.hasOwnProperty(word)){
          map[word]++;
       }else{
          map[word] = 1;
       }
    });
    const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
    frequencyArr.sort((a, b) => b[1] - a[1]);
    for (var i = frequencyArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = frequencyArr[i];
        frequencyArr[i] = frequencyArr[j];
        frequencyArr[j] = temp;
    }
    return frequencyArr.slice(0, num).map(el => el[0]);
 };
 function readbook(){
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = booksumm;
    utter.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
 };
