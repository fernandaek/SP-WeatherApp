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

            const canvas = document.getElementById("myChart").getContext("2d");

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