/* eslint-disable no-use-before-define */
// Search for recipe based on name
$("#search-btn").on("click", function (event) {
  event.preventDefault();
  // Save recipe they searched for
  var recipeSearch = $("#recipe-search").val().trim();
  // AJAX get request to our api, including the user's recipe in the url
  $.get("/api/recipes/" + recipeSearch, function (data) {
    console.log(data);
    // Call our renderRecipes function to add our recipes to the page
    renderRecipes(data);
  });
  $("#recipe-search").val("");
  //scroll down to results after pressing search button
  $("body, html").animate({
    scrollTop: $("#searchedResult").offset().top
  }, 600);

});

// When user searches by ingredients
$("#ingredient-search-btn").on("click", function (event) {
  event.preventDefault();
  var ingredientSearch = $("#ingredient-search").val().trim();
  $.get("/api/recipes/ingredients/" + ingredientSearch, function (data) {
    console.log(data);
    renderRecipes(data);
  });
  $("#ingredient-search").val("");
  //scroll down to results after pressing search button
  $("body, html").animate({
    scrollTop: $("#searchedResult").offset().top
  }, 600);
});

// When user searches by category
$("#category-search-btn").on("click", function (event) {
  event.preventDefault();
  var categorySearch = $("#category-search").val().trim();
  $.get("/api/recipes/category/" + categorySearch, function (data) {
    console.log(data);
    renderRecipes(data);
  });
  $("#category-search").val("");
  //scroll down to results after pressing search button
  $("body, html").animate({
    scrollTop: $("#searchedResult").offset().top
  }, 600);
});

function renderRecipes(data) {
  if (data.length !== 0) {

    $("#searchedResult").empty();
    $("#searchedResult").show();

    for (var i = 0; i < data.length; i++) {
      var div = $("<div>");
      // var newSection = $("<div>");
      // newSection.addClass("new");
      // newSection.attr("id", "recipe-new-" + i);
      // $("#stats").append(newSection);

      div.append("<h2 id='recipe_name'>" + data[i].name + "</h2>");
      div.append("<p id='recipe_ingr'>Ingredients: " + data[i].ingredients + "</p>");
      div.append("<p id='recipe_cat'>Category: " + data[i].category + "</p>");
      div.append("<p id='recipe_cont'>Content: " + data[i].content + "</p>");
      div.append("<button class='delete' data-id='" + data[i].id + "'>DELETE</button><br><br>");
      $("#searchedResult").append(div);
    }

    $(".delete").click(function () {
      $.ajax({
        method: "DELETE",
        url: "/api/recipes/" + $(this).attr("data-id")
      })
        .then(function () {
          console.log("Deleted Successfully!");
        });
      $(this).closest("div").remove();
    });

  }

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });
}