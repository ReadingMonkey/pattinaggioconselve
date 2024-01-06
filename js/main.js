$(document).ready(function(){

    let url = window.location.href;
    let page = url.split('#')[1];

    $('.nav-link').click(function(){
        $('#togglerone').click();
    });
    
    if (page === 'about') {
        $('#content').load("../partials/about.html");
    }
    $('#about').click(function(){
        $('#content').load("../partials/about.html");
    });

    if (page === 'courses') {
        $('#content').load("../partials/courses.html");
    }
    $('#courses').click(function(){
        $('#content').load("../partials/courses.html");
    });

    if (page === 'news') {
        $('#content').load("../partials/news.html");
    }
    $('#news').click(function(){
        $('#content').load("../partials/news.html");
    });

    if (page === 'docs') {
        $('#content').load("../partials/docs.html");
    }
    $('#docs').click(function(){
        $('#content').load("../partials/docs.html");
    });

    if (page === 'partners') {
        $('#content').load("../partials/partners.html");
    }
    $('#partners').click(function(){
        $('#content').load("../partials/partners.html");
    });

    if (page === 'contacts') {
        $('#content').load("../partials/contacts.html");
    }
    $('#contacts').click(function(){
        $('#content').load("../partials/contacts.html");
    });

});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
    x.className += " responsive";
    } else {
    x.className = "topnav";
    }
}




