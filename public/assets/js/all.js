// Make a get request to our api route that will return every recipe
$.get("/api/all", function(data) {
  // For each recipe that our server sends us back
  for (var i = 0; i < data.length; i++) {
    // Create a parent div to hold recipe data
    var wellSection = $("<div>");

    wellSection.addClass("well");
    // Add an id to the well to mark which well it is
    wellSection.attr("id", "recipe-well-" + i);
    $("#well-section").append(wellSection);

    $("#recipe-well-" + i).append("<h2 id='recipe_name'>" + (i + 1) + ": " + " " + data[i].name + "</h2>");
    $("#recipe-well-" + i).append("<h3 id='recipe_ingr'>Ingredients: " + data[i].ingredients + "</h4>");
    $("#recipe-well-" + i).append("<h3 id='recipe_cat'>Category: " + data[i].category + "</h4>");
    $("#recipe-well-" + i).append("<h3 id='recipe_cont'>Content: " + data[i].content + "</h4>");
    $("#recipe-well-" + i).append("<button class='delete' data-id='" + data[i].id + "'>DELETE</button><br><br>");
    $("#recipe-well-" + i).append(`<button type="button" class="btn-1 btn-secondary" data-toggle="modal" data-target="#exampleModal" data-content="${data[i].content}" data-id="${data[i].id}" data-name="${data[i].name}" data-ingredients="${data[i].ingredients}" data-category="${data[i].category}">Update Recipe!</button><br></br>`);

  }

  $(".delete").click(function() {
    const context = this;
    $.ajax({
      method: "DELETE",
      url: "/api/all/" + $(this).attr("data-id")
    })
      .then(function(res) {
        console.log(res);
        console.log("Deleted Successfully!");
        $(context).closest("div").remove();
      });
  });

  $(".update").click(function() {
    $.ajax({
      method: "PUT",
      url: "/recipes/"+ $(this).attr("data-id"),
      data: { name: $("#name").val(),
        ingredients: $("#ingredients").val(),
        category: $("#category").val(),
        content: $("#content").val(),
      }
    }).then(function(res) {
      console.log($("#name").val());
      console.log(res);
      //reloads the page automatically when clicked
      window.location.reload(1);
    });
  });

});