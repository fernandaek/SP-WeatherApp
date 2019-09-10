$(document).ready(function(){

    //API variables
    var apiPrt1 = "https://api.openweathermap.org/data/2.5/forecast?id=";
    var city = "2673730"; //Stockholm-ID   
    var apiKey = "&APPID=d293bf086a35de0628262aff4d26f8d9";

$.ajax({

    url: apiPrt1 + city + apiKey,
    method: "GET",
    dataType: "JSON",
    data: "{}",

    success: function(data) {

        //Variable for current time ------------------------------------------
        var m = new Date;
        var timeNow = moment(m).format("HH");
        var displayTime = moment(m).format("HH:mm");
        var displayDate = moment(m).format("ddd DD MMM");

        //Variables for wind
        var windSpeed = data.list[0].wind.speed;
        var windDeg = Math.floor(data.list[0].wind.deg) + "°";
        //--------------------------------------------------------------------


        //Choose background --------------------------------------------------
        if(timeNow <= "18" && timeNow >= "05"){
            $("#myBox").css("background", "rgba(88, 186, 219, 0.479)")
            }
        else{$("#myBox").css("background", "rgba(44, 44, 100, 0.226)")}
        //--------------------------------------------------------------------


        //Convert temperature ------------------------------------------------
        var k = data.list[0].main.temp;
        var c = k - 273.15;
        var celcius = Math.floor(c) + "°";
        var f = k * 9/5 - 459.67;
        var fahrenheit = Math.floor(f) + "°";
        //---------------------------------------------------------------------


        //Call functions for today --------------------------------------------
        $("#icon img").attr("src", pickIcon(0));
        $("#tempNow").html(celcius);
        $("#time").html(displayTime);
        $("#yearMonth").val(displayDate);
        //---------------------------------------------------------------------


        //Call functions for upcomming days------------------------------------
        $(".day2 div").html(pickDay(4));
        $(".day2 img").attr("src",pickIcon(4));

        $(".day3 div").html(pickDay(8));
        $(".day3 img").attr("src",pickIcon(8));

        $(".day4 div").html(pickDay(12));
        $(".day4 img").attr("src",pickIcon(12));

        $(".day5 div").html(pickDay(16));
        $(".day5 img").attr("src",pickIcon(16));
        //---------------------------------------------------------------------    


        //Function for checking upcomming days --------------------------------
        function setDay(){
            var d = new Date;
            var dToday = moment(d)
            var dTwo = dToday.clone().add(1,"day").format("ddd");
            var dThree = dToday.clone().add(2,"days").format("ddd");
            var dFour = dToday.clone().add(3,"days").format("ddd");
            var dFive = dToday.clone().add(4,"days").format("ddd");

            $(".day2 p").html(dTwo);
            $(".day3 p").html(dThree);
            $(".day4 p").html(dFour);
            $(".day5 p").html(dFive);
        }
        $(setDay());
        //-----------------------------------------------------------------


        //Function for Icon depending on the weather ----------------------
        function pickIcon(i) {

            var descrip = data.list[i].weather[0].description;
            var iconSrc;

            if(descrip == "clear sky"){

                if(timeNow <= "18" && timeNow >= "05"){
                    iconSrc = "animated/day.svg"
                }
                else{iconSrc = "animated/night.svg"}
            }

            else if(descrip == "few clouds"){
                if(timeNow <= "18" && timeNow >= "05"){
                    iconSrc = "animated/cloudy-day-2.svg"
                }
                else{iconSrc = "animated/cloudy-night-2.svg"}
            }

            else if(descrip == "scattered clouds"){
                iconSrc = "animated/cloudy.svg"
            }

            else if(descrip == "broken clouds"){
                iconSrc = "animated/cloudy.svg"
            }

            else if(descrip == "shower rain"){
                iconSrc = "animated/rainy-6.svg"
            }

            else if(descrip == "rain"){
                iconSrc = "animated/rainy-5.svg"
            }

            else if(descrip == "thunderstorm"){
                iconSrc = "animated/thunder.svg"
            }

            else if(descrip == "snow"){
                if(timeNow <= "18" && timeNow >= "05"){
                    iconSrc = "animated/snowy-3.svg"
                }
                else{iconSrc = "animated/snowy-6.svg"}
            }

            else if(descrip == "mist"){
                iconSrc = "animated/cloudy.svg"
            }

            else{iconSrc = "animated/cloudy.svg"}
        
            return iconSrc;
        }
        //-------------------------------------------------------------------


        //Function for upcomming days ----------------------------------------
        function pickDay(i, unit) {
            var i;
            var k = data.list[i].main.temp;
            var c = k - 273.15;
            var celcius = Math.floor(c) + "°";
            var f = k * 9/5 - 459.67;
            var fahrenheit = Math.floor(f) + "°";

            if(unit == "fahr"){
                return fahrenheit;
            }
            else{return celcius;}
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
        $("#swichTemp").click(function(){
            if($("#tempNow").html() == celcius){
                $("#tempNow").html(fahrenheit);
                $(".day2 div").html(pickDay(4, "fahr"));
                $(".day3 div").html(pickDay(8, "fahr"));
                $(".day4 div").html(pickDay(12, "fahr"));
                $(".day5 div").html(pickDay(16, "fahr"));
            }
            else if($("#tempNow").html() == fahrenheit){
                $("#tempNow").html(celcius);
                $(".day2 div").html(pickDay(4));
                $(".day3 div").html(pickDay(8));
                $(".day4 div").html(pickDay(12));
                $(".day5 div").html(pickDay(16));
            }
        });
        //---------------------------------------------------------------------

        //Show / Hide wind function
        // $("#windHide").html(windSpeed +" m/s " + windDeg);
        // $("#openWind").hover(function(){
        //     $("#windHide").toggle();
        // });
     
    },

    error: function(jqXHR, textStatus, errorThrown) {
        $(".myBox").html("Något gick fel")
    }
});

});