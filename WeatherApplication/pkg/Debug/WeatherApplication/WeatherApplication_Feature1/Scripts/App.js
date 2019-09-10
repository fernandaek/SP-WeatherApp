function getQueryStringParameter(urlParameterKey) {
    var params = document.URL.split('?')[1].split('&');
    var strParams = '';
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split('=');
        if (singleParam[0] == urlParameterKey)
            return decodeURIComponent(singleParam[1]);
    }
}

jQuery.noConflict();
(function ($) {

    // Create variables out of the param value
    var myTemperature = getQueryStringParameter('Temperatur');
    var windDir = getQueryStringParameter('WindDirection');
    var windSpeed = getQueryStringParameter('WindSpeed');
    var myTemplate = getQueryStringParameter('MyEnumOne');
    var plats = getQueryStringParameter('MyEnumTwo');


    // if satsen plats
    if (plats == 1) {
        $("#cityName").html('Stockholm');
        $("#myBG").css("background-image", "url(../Images/stockholm.jpg)!important");
    }
    else if (plats == 2) {
        $("#cityName").html('Malmö');
        $("#myBG").css("background-image", "url(../Images/Malmo.jpg)!important");
    }
    else if (plats == 3) {
        $("#cityName").html('Göteborg');
        $("#myBG").css("background-image", "url(../Images/Gotemburg.jpg)!important");
    }


})(jQuery);

jQuery(document).ready(function ($) {

    var city;

    //Show / Hide Search city---------------------------------------------
    $("#searchBox").hover(function () {
        $("#searchText").slideDown(300);
    })

    $("#slideUpBox").click(function () {
        $("#searchText").slideUp(300);
    })
    //--------------------------------------------------------------------

    var apiPrt1 = "https://api.openweathermap.org/data/2.5/forecast?id=";
    var apiKey = "&APPID=d293bf086a35de0628262aff4d26f8d9";
    city = "2673730"; //Stockholm-ID   
    // Göteborg: 2711537
    //Malmö: 2692969
    function myAjax() {
        $.ajax({
            url: apiPrt1 + city + apiKey,
            method: "GET",
            dataType: "JSON",
            data: "{}",

            success: function (data) {

                console.log(data.list)

                //Variable for current time ------------------------------------------
                var m = new Date;
                var timeNow = moment(m).format("HH");
                var displayTime = moment(m).format("HH:mm");
                var displayDate = moment(m).format("ddd DD MMM");

                //Variables for wind
                var windSpeed = data.list[0].wind.speed;
                var windDeg = Math.floor(data.list[0].wind.deg) + "°";
                //--------------------------------------------------------------------

                timeNow = "20"

                //Choose background depending on time --------------------------------
                if (timeNow < "18" && timeNow > "05") {
                    $("#myBox").css("background", "rgba(136, 136, 136, 0.30)")

                }
                else {
                    $("#myBox").css("background", "rgba(26, 26, 26, 0.80)")
                    $("#myDays span").css("border", "solid 1px rgba(245, 245, 245, 0.10)");
                }
                //--------------------------------------------------------------------


                //Convert temperature ------------------------------------------------
                var k = data.list[0].main.temp;
                var c = k - 273.15;
                var celcius = Math.floor(c) + "°";
                var f = k * 9 / 5 - 459.67;
                var fahrenheit = Math.floor(f) + "°";
                //---------------------------------------------------------------------

                console.log("temperatur nu: " + celcius);

                //Call functions for today --------------------------------------------
                $("#icon img").attr("src", pickIcon(0));
                $("#tempNow").html(celcius);
                $("#time").html(displayTime);
                $("#yearMonth").val(displayDate);
                //---------------------------------------------------------------------


                //Call functions for upcomming days------------------------------------
                $(".day2 div").html(pickDay(8));
                $(".day2 img").attr("src", pickIcon(9));


                $(".day3 div").html(pickDay(16));
                $(".day3 img").attr("src", pickIcon(16));

                $(".day4 div").html(pickDay(24));
                $(".day4 img").attr("src", pickIcon(25));

                $(".day5 div").html(pickDay(32));
                $(".day5 img").attr("src", pickIcon(32));
                //---------------------------------------------------------------------    


                //Function for checking upcomming days --------------------------------
                function setDay() {
                    var d = new Date;
                    var dToday = moment(d)
                    var dTwo = dToday.clone().add(1, "day").format("ddd");
                    var dThree = dToday.clone().add(2, "days").format("ddd");
                    var dFour = dToday.clone().add(3, "days").format("ddd");
                    var dFive = dToday.clone().add(4, "days").format("ddd");

                    $(".day2 p").html(dTwo);
                    $(".day3 p").html(dThree);
                    $(".day4 p").html(dFour);
                    $(".day5 p").html(dFive);
                }
                $(setDay());
                //-----------------------------------------------------------------




                //Function for Icon depending on the weather ----------------------
                function pickIcon(i) {

                    var descrip = data.list[i].weather[0].main;
                    var descrip2 = data.list[i].weather[0].description;
                    var iconSrc;

                    if (descrip == "Clear") {

                        if (timeNow < "18" && timeNow > "05") {
                            iconSrc = "../Images/animated/day.svg"
                        }
                        else { iconSrc = "../Images/animated/night.svg" }
                    }

                    else if (descrip == "Clouds") {
                        if (descrip2 == "broken clouds" || descrip2 == "few clouds") {
                            if (timeNow < "18" && timeNow > "05") {
                                iconSrc = "../Images/animated/cloudy-day-2.svg"
                            }
                            else { iconSrc = "../Images/animated/cloudy-night-2.svg" }
                        }
                        else if (descrip2 == "scattered clouds") {
                            iconSrc = "../Images/animated/cloudy.svg"
                        }
                    }

                    else if (descrip == "Rain") {
                        if (descrip2 == "shower rain") {
                            iconSrc = "../Images/animated/rainy-1.svg"
                        }
                        else { iconSrc = "../Images/animated/rainy-5.svg" }
                    }

                    else if (descrip2 == "thunderstorm") {
                        iconSrc = "../Images/animated/thunder.svg"
                    }

                    else if (descrip == "Snow") {
                        if (timeNow < "18" && timeNow > "05") {
                            iconSrc = "../Images/animated/snowy-3.svg"
                        }
                        else { iconSrc = "../Images/animated/snowy-6.svg" }
                    }

                    else if (descrip == "Mist") {
                        iconSrc = "../Images/animated/cloudy.svg"
                    }
                    else { iconSrc = "../Images/animated/cloudy.svg" }

                    return iconSrc;
                }
                //--------------------------------------------------------------------


                //Function for upcomming days ----------------------------------------
                function pickDay(i, unit) {
                    var i;
                    var k = data.list[i].main.temp;
                    var c = k - 273.15;
                    var celcius = Math.floor(c) + "°";
                    var f = k * 9 / 5 - 459.67;
                    var fahrenheit = Math.floor(f) + "°";

                    if (unit == "fahr") {
                        return fahrenheit;
                    }
                    else { return celcius; }
                };
                //---------------------------------------------------------------------



                //Function for updating time ------------------------------------------
                function updateTime() {
                    displayTime = setInterval(flashTime, 1000);
                };
                function flashTime() {
                    m = new Date;
                    displayTime = moment(m).format("HH:mm");
                    $("#time").html(displayTime);
                }
                $(updateTime());
                //---------------------------------------------------------------------


                //Function for switching between C and F-------------------------------
                $("#swichTemp").click(function () {
                    if ($("#tempNow").html() == celcius) {
                        $("#tempNow").html(fahrenheit);
                        $(".day2 div").html(pickDay(8, "fahr"));
                        $(".day3 div").html(pickDay(16, "fahr"));
                        $(".day4 div").html(pickDay(24, "fahr"));
                        $(".day5 div").html(pickDay(32, "fahr"));
                    }
                    else if ($("#tempNow").html() == fahrenheit) {
                        $("#tempNow").html(celcius);
                        $(".day2 div").html(pickDay(8));
                        $(".day3 div").html(pickDay(16));
                        $(".day4 div").html(pickDay(24));
                        $(".day5 div").html(pickDay(32));
                    }
                });
                //---------------------------------------------------------------------

                $("#myDays div").click(function () {
                    window.open("https://alvocriativa.sharepoint.com/sites/dev/SitePages/DevHome.aspx")
                })

                var description = data.list[0].weather[0].description;
                $("#description").html(description);

                //Show / Hide wind function
                // $("#windHide").html(windSpeed +" m/s " + windDeg);
                // $("#openWind").hover(function(){
                //     $("#windHide").toggle();
                // });



            },

            error: function (jqXHR, textStatus, errorThrown) {
                $(".myBox").html("Något gick fel")
            }
        });

    };
    $(myAjax());

});






// // Chart JS -

window.onload = function () {

    var apiPrt1 = "https://api.openweathermap.org/data/2.5/forecast?id=";
    var apiKey = "&APPID=d293bf086a35de0628262aff4d26f8d9";
    var city = "2673730"; //Stockholm-ID

    jQuery.ajax({
        url: apiPrt1 + city + apiKey,
        method: "GET",
        dataType: "JSON",
        data: "{}",
        success: function (data) {
            console.log(data.list)

            const canvas = document.getElementById("myChart");
            var ctx = canvas.getContext("2d");

            var weatherData = {
                labels: [],
                datasets: [
                    {
                        label: "Högsta temp",
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        BorderWidth: 2,
                        data: [],
                    },
                    {
                        label: "Lägsta temp",
                        backgroundColor: "rgba(85,182,182,0.2)",
                        borderColor: "rgba(05,132,102,1)",
                        BorderWidth: 2,
                        data: [],
                    }
                ]
            };

            var list = data.list;

            var time;

            for (var i = 0; i < 9; i++) {

                time = moment(list[i].dt_txt).format("HH:mm");
                var tempMax = Math.floor(list[i].main["temp_max"] - 273.15);
                var tempMin = Math.floor(list[i].main["temp_min"] - 273.15);

                weatherData.labels.push(time);
                weatherData.datasets[0].data.push(tempMax);
                weatherData.datasets[1].data.push(tempMin);
            }

            var myNewChart = new Chart(ctx, {
                type: "line",
                data: weatherData,
            });



            function tryFunc(x, y) {

                var canvas = document.getElementById("myChart");
                var ctx = canvas.getContext("2d");

                var weatherData = {
                    labels: [],
                    datasets: [
                        {
                            label: "Högsta temp",
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            BorderWidth: 2,
                            data: [],
                        },
                        {
                            label: "Lägsta temp",
                            backgroundColor: "rgba(85,182,182,0.2)",
                            borderColor: "rgba(05,132,102,1)",
                            BorderWidth: 2,
                            data: [],
                        }
                    ]
                };

                for (var i = x; i < y; i++) {
                    var time = moment(list[i].dt_txt).format("HH:mm");
                    var tempMax = Math.floor(list[i].main["temp_max"] - 273.15);
                    var tempMin = Math.floor(list[i].main["temp_min"] - 273.15);

                    weatherData.labels.push(time);
                    weatherData.datasets[0].data.push(tempMax);
                    weatherData.datasets[1].data.push(tempMin);
                }

                var myNewChart = new Chart(ctx, {
                    type: "line",
                    data: weatherData,
                });
            }

            var d = new Date;
            var dToday = moment(d)
            var dTwo = dToday.clone().add(1, "day").format("dddd");
            var dThree = dToday.clone().add(2, "days").format("dddd");
            var dFour = dToday.clone().add(3, "days").format("dddd");
            var dFive = dToday.clone().add(4, "days").format("dddd");

            $("#btn2").prop('value', dTwo)
            $("#btn3").prop('value', dThree)
            $("#btn4").prop('value', dFour)
            $("#btn5").prop('value', dFive)



            $("#btn1").click(function () {
                $(tryFunc(0, 9));
                console.log(list[0].dt_txt)
            });

            $("#btn2").click(function () {

                for (i = 1, y = 10; y < list.length; y++) {

                    time = moment(list[i].dt_txt).format("HH:mm");
                    if (time == "00:00") {
                        console.log(list[i].dt_txt)
                        $(tryFunc(i, y));
                        break;
                    }
                    i++
                }

            });

            $("#btn3").click(function () {

                for (i = 10, y = 19; y < list.length; y++) {

                    time = moment(list[i].dt_txt).format("HH:mm");
                    if (time == "00:00") {
                        console.log(list[i].dt_txt)
                        $(tryFunc(i, y));
                        break;
                    }
                    i++
                }

            });

            $("#btn4").click(function () {

                for (i = 18, y = 27; y < list.length; y++) {

                    time = moment(list[i].dt_txt).format("HH:mm");
                    if (time == "00:00") {
                        console.log(list[i].dt_txt)
                        $(tryFunc(i, y));
                        break;
                    }
                    i++
                }

            });

            $("#btn5").click(function () {

                for (i = 25, y = 34; y <= list.length; y++) {

                    time = moment(list[i].dt_txt).format("HH:mm");
                    if (time == "00:00") {
                        console.log(list[i].dt_txt)
                        $(tryFunc(i, y));
                        break;
                    }
                    i++
                }

            });


        }
    });
}