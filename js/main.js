// side menu slider //

let menuWidth = $(".menuLeft").outerWidth();
$("#menu").css({left : `-${menuWidth}`})
$(".fa-bars").click( function(){
    let menuLeft = $("#menu").css("left");
    if(menuLeft == "0px")
    {
        $("#menu").animate({left : `-${menuWidth}`}, 1000)
        $(".menuTogg").removeClass("fa-times")
        $(".menuTogg").addClass("fa-bars");
        $(".menuOpt li").animate({top: "200%"}, 400);
    }
    else
    {
        $("#menu").animate({left : `0px`}, 1000)
        $(".menuTogg").removeClass("fa-bars")
        $(".menuTogg").addClass("fa-times");
        $(".menuOpt .one").animate({top: "5%"}, 400, function(){
            $(".menuOpt .two").animate({top: "15%"}, 400, function(){
                $(".menuOpt .three").animate({top: "25%"}, 300, function(){
                    $(".menuOpt .four").animate({top: "35%"}, 300, function(){
                        $(".menuOpt .five").animate({top: "45%"}, 200, function(){
                            $(".menuOpt .six").animate({top: "55%"}, 200);
                        });
                    });
                });
            });
        });
    }
})

// getting films api and displaying them //

let allFilms = [];
let filmsUrl = "";
let defaultFilms = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1sozD6PDx3-zmxllpAVXFTh5grq5i-TVD2fx7NeXkxr-GPzb4a1dX90og";
let nowPlayingFilms = "https://api.themoviedb.org/3/movie/now_playing?api_key=7d7750a1926e0ee9afe927357f782205&language=en-US&page=1"
let popularFilms = "https://api.themoviedb.org/3/movie/popular?api_key=7d7750a1926e0ee9afe927357f782205&language=en-US&page=1";
let topRatedFilms = "https://api.themoviedb.org/3/movie/top_rated?api_key=7d7750a1926e0ee9afe927357f782205&language=en-US&page=1";
let trendingFilms = "https://api.themoviedb.org/3/movie/latest?api_key=7d7750a1926e0ee9afe927357f782205&language=en-US";
let upcomingFilms = "https://api.themoviedb.org/3/movie/upcoming?api_key=7d7750a1926e0ee9afe927357f782205&language=en-US&page=1";

filmsUrl = defaultFilms;
getFilms();

function getFilms()
{
    let http = new XMLHttpRequest();
    http.open("GET", filmsUrl);
    http.send();
    http.addEventListener("readystatechange", function()
    {
        if(http.status == 200 && http.readyState == 4)
        {
            allFilms = JSON.parse(http.response).results;
            displayFilms();
        }
    })
}
function displayFilms()
{
    let films = ``;
    let path = "https://image.tmdb.org/t/p/w500/";
    for(let i=0; i<allFilms.length; i++)
    {
        films += `
            <div class="col-md-4 mb-4 shadow">
                <div class="onefilm position-relative">
                    <img class="img-fluid" src="`+ path + allFilms[i].poster_path +`">
                    <div class="filmCap text-center d-flex flex-wrap align-content-center justify-content-center">
                        <h2>`+ allFilms[i].title +`</h2>
                        <p>`+ allFilms[i].overview +`</p>
                        <p class="w-100">Rate: `+ allFilms[i].vote_average +`</p>
                        <p class="w-100">`+ allFilms[i].release_date +`</p>
                    </div>
                </div>
            </div>
        `
    }
    document.getElementById("films").innerHTML = films;
}

// getting films by the trends in the side menu //

$(".menuOpt .one").click(function(){
    filmsUrl = nowPlayingFilms;
    getFilms();
});
$(".menuOpt .two").click(function(){
    filmsUrl = popularFilms;
    getFilms();
});
$(".menuOpt .three").click(function(){
    filmsUrl = topRatedFilms;
    getFilms();
});
$(".menuOpt .four").click(function(){
    filmsUrl = trendingFilms;
    getFilms();
});
$(".menuOpt .five").click(function(){
    filmsUrl = upcomingFilms;
    getFilms();
});

// making blue outline to the inputs //

$("input").click(function(){
    $(this).addClass("blurring");
})
$("input").blur(function(){
    $(this).removeClass("blurring");
})

// searching for films //

function searchFilms(key)
{
    let res = ``;
    let path = "https://image.tmdb.org/t/p/w500/";
    for(let i=0; i<allFilms.length; i++)
    {
        if((allFilms[i].title).toLowerCase().includes(key.toLowerCase())
        ||(allFilms[i].overview).toLowerCase().includes(key.toLowerCase()))
        {
            res += `
                <div class="col-md-4 mb-4 shadow">
                    <div class="onefilm position-relative">
                        <img class="img-fluid" src="`+ path + allFilms[i].poster_path +`">
                        <div class="filmCap text-center d-flex flex-wrap align-content-center justify-content-center">
                            <h2>`+ allFilms[i].title +`</h2>
                            <p>`+ allFilms[i].overview +`</p>
                            <p class="w-100">Rate: `+ allFilms[i].vote_average +`</p>
                            <p class="w-100">`+ allFilms[i].release_date +`</p>
                        </div>
                    </div>
                </div>
            `
        }
    }
    if(res.length <= 0)
    {
        displayFilms()
    }
    else
    {
        document.getElementById("films").innerHTML = res;
    }
}

function searchTitles(word)
{
    let res = ``;
    let path = "https://image.tmdb.org/t/p/w500/";
    for(let i=0; i<allFilms.length; i++)
    {
        if((allFilms[i].title).toLowerCase().includes(word.toLowerCase()))
        {
            res += `
                <div class="col-md-4 mb-4 shadow">
                    <div class="onefilm position-relative">
                        <img class="img-fluid" src="`+ path + allFilms[i].poster_path +`">
                        <div class="filmCap text-center d-flex flex-wrap align-content-center justify-content-center">
                            <h2>`+ allFilms[i].title +`</h2>
                            <p>`+ allFilms[i].overview +`</p>
                            <p class="w-100">Rate: `+ allFilms[i].vote_average +`</p>
                            <p class="w-100">`+ allFilms[i].release_date +`</p>
                        </div>
                    </div>
                </div>
            `
        }
    }
    if(res.length <= 0)
    {
        displayFilms()
    }
    else
    {
        document.getElementById("films").innerHTML = res;
    }
}

// contact us form validation //

let username = document.querySelector(".name");
let nameAlert = document.querySelector(".nameAlert");
let mail = document.querySelector(".mail");
let mailAlert = document.querySelector(".mailAlert");
let phone = document.querySelector(".phone");
let phoneAlert = document.querySelector(".phoneAlert");
let age = document.querySelector(".age");
let ageAlert = document.querySelector(".ageAlert");
let pass = document.querySelector(".pass");
let passAlert = document.querySelector(".passAlert");
let repass = document.querySelector(".repass");
let repassAlert = document.querySelector(".repassAlert");

function nameValidation()
{
    let regex = /^[a-zA-Z0-9]+$/
    if(regex.test(username.value))
    {
        nameAlert.style.display = "none"
    }
    else
    {
        nameAlert.style.display = "block"
    }
}
function mailValidation()
{
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if(regex.test(mail.value))
    {
        mailAlert.style.display = "none"
    }
    else
    {
        mailAlert.style.display = "block"
    }
}
function phoneValidation()
{
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if(regex.test(phone.value))
    {
        phoneAlert.style.display = "none"
    }
    else
    {
        phoneAlert.style.display = "block"
    }
}
function ageValidation()
{
    let regex = /^[1-9][0-9]?$|^100$/
    if(regex.test(age.value))
    {
        ageAlert.style.display = "none"
    }
    else
    {
        ageAlert.style.display = "block"
    }
}
function passValidation()
{
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regex.test(pass.value))
    {
        passAlert.style.display = "none"
    }
    else
    {
        passAlert.style.display = "block"
    }
}
function repassValidation()
{
    if(pass.value == repass.value)
    {
        repassAlert.style.display = "none"
    }
    else
    {
        repassAlert.style.display = "block"
    }
}

username.addEventListener("keyup", nameValidation);
mail.addEventListener("keyup", mailValidation);
phone.addEventListener("keyup", phoneValidation);
age.addEventListener("keyup", ageValidation);
pass.addEventListener("keyup", passValidation);
repass.addEventListener("keyup", repassValidation);

document.getElementById("contact").addEventListener("click", function()
{
    if(nameAlert.style.display == "none" && mailAlert.style.display == "none" && phoneAlert.style.display == "none"
    && ageAlert.style.display == "none" && passAlert.style.display == "none" && repassAlert.style.display == "none")
    {
        $("#submit").removeAttr("disabled");
    }
});