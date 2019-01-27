// when you click on find a friend
$("#surveySubmit").on("click", function (event) {
    event.preventDefault();

    // form validation
    if ($("#userName").val().trim() === "" || $("#userPhoto").val().trim() === "") {
        return
    }

    // save user info
    var userScores = [];
    for (i = 1; i < 11; i++) {
        userScores.push(parseFloat($("#question" + i).val()));
    };
    var userInfo = {
        "name": $("#userName").val().trim(),
        "photo": $("#userPhoto").val().trim(),
        "scores": userScores
    };

    // make api call for friend scores
    $.ajax({
            url: "/api/friends",
            method: "GET"
        })
        .then(function (data) {
            // calculate smallest difference in scores to find best friend
            var smallestDifference = 100
            var totalDifference = 0;
            var bestFriendIndex
            for (i = 0; i < data.length; i++) {
                totalDifference = 0
                var friendScores = data[i].scores;
                for (j = 0; j < friendScores.length; j++) {
                    var difference = Math.abs(userScores[j] - parseFloat(friendScores[j]));
                    totalDifference += difference;
                };
                if (totalDifference < smallestDifference) {
                    smallestDifference = totalDifference;
                    bestFriendIndex = i
                }
            };
            // log best friend name and photo to modal
            $("#friendPhoto").html("<img src='" + data[bestFriendIndex].photo + "' width='400 px'>");
            $("#friendName").text(data[bestFriendIndex].name);
        }).then(function () {

            // make ajax call to post user data to api
            $.ajax({
                    url: "/api/friends",
                    method: "POST",
                    data: userInfo
                })
                // .then(function (data) {
                //     // clear form
                //     $("#userName").val() = "";
                //     $("#userPhoto").val() = "";
                //     $(".survey").val() = ""
                // });
        });
    // clear form
    $("#userName").val("");
    $("#userPhoto").val("");
    $(".survey").val("1");
    });
