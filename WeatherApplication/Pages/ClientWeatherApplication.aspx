<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>


    <link type="text/css" href="../Content/App.css" rel="stylesheet" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/sv.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins:100" rel="stylesheet">
    <script src="../Scripts/App.js"></script>

    
    <script>
        // Set the style of the client web part page to be consistent with the host web.

        var city;
        var cityNrTemp;
        var cityNameTemp;
        var hostweburl;
        var appweburl;

        // Deals with the issue the call against the app web.
        function readMyJson() {
            $.ajax({
                url: "../Scripts/current.city.list.min.json",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: successHandler,
                error: errorHandler
            });

            // Function to handle the success event. Prints the data to the page.
            function successHandler(data) {
                var jsonObject = JSON.parse(data.body);
                var results = jsonObject.d.results;
                console.log(results)

                $("#searchText").keyup(function () {
                    $("#cityResult").html('');
                    var searchField = $("#searchText").val();
                    var expression = RegExp(searchField, "i");

                    for (var i = 0; i < data.length; i++) {
                        var searchVar = data[i].name.search(expression);

                        if (searchVar != -1) {
                            $("#cityResult").html('<div id="listResults">' +
                                '<input type="button" id="pickCity"' +
                                'value=' + '"' + data[i].name + '"' + '></div>')
                            cityNrTemp = data[i].id;
                            cityNameTemp = data[i].name
                        }
                    }

                    if (searchField == "") {
                        $("#cityResult").html('');
                    }

                    $("#pickCity").click(function () {
                        $("#cityResult").html('');
                        $("#searchText").val('');
                        city = cityNrTemp;
                        $("#cityName").val(cityNameTemp)
                        $(myAjax());
                        $("#searchText").slideUp(200);
                        console.log(cityNrTemp);
                    })
                })
            }

            // Function to handle the error event. Prints the error message to the page.
            function errorHandler(data, errorCode, errorMessage) {
                document.getElementById("internal").innerText = "Could not complete cross-domain call: " + errorMessage;
            }
            // Function to retrieve a query string value.
            function getQueryStringParameter(paramToRetrieve) {
                var params =
                    document.URL.split("?")[1].split("&");
                var strParams = "";
                for (var i = 0; i < params.length; i = i + 1) {
                    var singleParam = params[i].split("=");
                    if (singleParam[0] == paramToRetrieve)
                        return singleParam[1];
                }
            }
        }

    </script>
  

</head>
<body>

  

<div id="myBG">
    <div id="myBox">
        <div id="searchBox">
            <input type="button" id="cityName" value="Stockholm"> <br>
            <input id="searchText" type="text" autocomplete="off" placeholder="Sök plats..." value="">
            <div id="cityResult"></div>
        </div>
        <div id="slideUpBox">
            <div id="icon">
                <img src="#" alt="">
            </div>
            <div id="tempAndDate">
                <div id="tempBox">
                    <div id="tempNow"></div>
                    <input id="swichTemp" type="button" value="C°/F°">
                </div>
                <div id="dateBox">
                    <div id="time"></div>
                    <input id="yearMonth" type="button" value="">
                </div>
            </div>

            <div id="myDays">
                 <span class="day2">
                    <div></div>
                    <img src="#" alt="">
                    <p></p>
                </span>

                <span class="day3">
                    <div></div>
                    <img src="#" alt="">
                    <p></p>
                </span>

                <span class="day4">
                    <div></div>
                    <img src="#" alt="">
                    <p></p>
                </span>

                <span class="day5">
                    <div></div>
                    <img src="#" alt="">
                    <p></p>
                </span>
            </div>
         </div>
    </div>
</div>

</body>
</html>
