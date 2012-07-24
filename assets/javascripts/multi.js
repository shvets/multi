
var FactorTableView = Backbone.View.extend({
  el: $('body'), // el attaches to existing element

  events: {
    'click button#add': 'addItem'
  },

  initialize: function(max) {
    this.max = max;
    _.bindAll(this, 'render', 'addItem'); // every function that uses 'this' as the current object should be in here
    
    this.counter = 0; // total number of items added thus far
    this.render();
  },

  render: function() {
    $(this.el).append("<button id='add'>Add list item</button>");
    $(this.el).append("<ul></ul>");
  },

  // `addItem()`: Custom function called via `click` event above.
  addItem: function() {
    this.counter++;
    $('ul', this.el).append("<li>hello world"+this.counter+"</li>");
  }
});



var FactorTableWidget = CommonFunctions.createClass({
  initialize: function(max) {
    this.max = max;

    var _this = this;

    $("#factor_button").click(function() {
      _this.generate_factor_table();
    });

    for(var i=0; i < max; i++) {
      var button = $("#button_" + (i+1));
      var result_field = $("#result_" + (i+1));

      button.click(this.update_status);
      result_field.focusout(this.update_status);
      button.removeAttr("disabled");
    }

    this.clear_results();
  },

  generate_factor_table: function() {
    var factor = $("#factor").val();

alert(factor);

    var response = $.ajax({
      type: "POST",
      url: "/factor",
      data: { factor: factor},
      dataType: "json",
      success: function(response) {
        $("#factor_table").replaceWith(response['result']);
        $("#factor_table").show();
      }
    });

  },

  update_status: function() {
    var button_id = jQuery(this).attr("id");
    var status_id = button_id.replace("button", "status");
    var result_id = button_id.replace("button", "result");
    var number1_id = button_id.replace("button", "number1");
    var number2_id = button_id.replace("button", "number2");

    var number1 = $("#" + number1_id).val();
    var number2 = $("#" + number2_id).val();
    var result = $("#" + result_id).val();

    var _this = this;

    $.ajax({
      type: "GET",
      url: "/multiply",
      data: { number1: number1, number2: number2, result: result },
      dataType: "json",
      success: function(response) {
        var result = response['result'];

        $("#" + status_id).text(result == true ? "OK" : "FAIL");
        $("#" + button_id).attr("disabled", "disabled");

        _this.update_successful_answers_count();
        _this.update_wrong_answers_count();
        _this.update_grade();
      }
    });
  },

  update_successful_answers_count: function() {
    $("#success").text("Successful answers: " + this.calculate_successfull_answers());
  },

  update_wrong_answers_count: function() {
    $("#fail").text("Wrong answers: " + this.calculate_wrong_answers());
  },

  update_grade: function() {
    $("#grade").text("Grade: " + this.calculate_grade());
  },

  calculate_successfull_answers: function() {
    var count = 0;

    for(var i=0; i < this.max; i++) {
      var status = jQuery("#status_" + i).text();

      if(status == "OK") {
        count++;
      }
    }

    return count;
  },

  calculate_wrong_answers: function() {
    var count = 0;

    for(var i=0; i < this.max; i++) {
      var status = jQuery("#status_" + i).text();

      if(status == "FAIL") {
        count++;
      }
    }

    return count;
  },

  calculate_grade: function() {
    var successful_answers = this.calculate_successfull_answers();
    var wrong_answers = this.calculate_wrong_answers();
    var total = successful_answers + wrong_answers;

    var response = $.ajax({
      type: "GET",
      url: "/calculate_grade",
      data: { total: total, failed: wrong_answers},
      dataType: "json",
      asynch: false
    });

    // var result = jQuery.parseJSON(jQuery.ajax({
    //   url: "/lines_cell/calculate_view_options",
    //   data: {line_number: lineNumber},
    //   dataType: 'json', async: false
    // }).responseText);

    // alert(result);

    // alert(result.result);

    //alert($.parseJSON(result).result);

  //alert(response.responseText);

    return "A";
  },

  clear_results: function() {
    for(var i=0; i < this.max; i++) {
      var result_field = jQuery("#result_" + i);

      result_field.text("");
    }
  }
});


