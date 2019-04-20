//TODO when a button is clicked search giphy API for "this" name



//TODO search bar will add a button to the page


//TODO generate buttons on load-up
var buttonArray = ["tree", "mountain", "utah", "beach"];

function buttonLoad() {
    $("#btnHangout").empty()
    for (let i = 0; i < buttonArray.length; i++) {
        console.log(buttonArray[i])
        var gifButton = $("<button>")
        gifButton.addClass("gifButtons btn btn-dark")
        gifButton.attr("data-name", buttonArray[i])
        gifButton.text(buttonArray[i])
        $("#btnHangout").append(gifButton)
    }
}

buttonLoad()


$("#searchBtn").on("click", function () {
    var btnName = $("#gifSearch").val()
    buttonArray.push(btnName)
    buttonLoad()
})


$(document).on("click", ".gifButtons", function () {
    console.log("working here")
    var gifName = $(this).attr("data-name")
    console.log(gifName)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zzluTfZGQ8bBJajVD4ZGmDiZljA9XMoO&q=" + gifName + "&limit=10&offset=0&&lang=en"

    $("#gifDiv").empty()
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data
            console.log(results)
            for (let i = 0; i < results.length; i++) {
                var gif = $("<img>")
                gif.addClass("gif")
                gif.attr("gif-pause", results[i].images.fixed_height_still.url)
                gif.attr("gif-play", results[i].images.fixed_height.url)
                gif.attr("src", results[i].images.fixed_height_still.url)
                $("#gifDiv").append(gif)
            }
        })



})

$(document).on("click", ".gif", function () {

    var gifPlay = $(this).attr("gif-play")
    var gifPause = $(this).attr("gif-pause")
    if ($(this).attr("src") === gifPause) {
        $(this).attr("src", gifPlay)
    }
    else {
        $(this).attr("src", gifPause)

    }
})