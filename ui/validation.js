$(function() {

  $.validator.setDefaults({
    errorClass: 'help-block',
    highlight: function(element){
      $(element)
        .closest('.form-group')
        .addClass('has-error');
    },
    unhighlight: function(element){
      $(element)
        .closest('.form-group')
        .removeClass('has-error')
        .addClass('has-success');
      }
  });

  $.validator.addMethod('strongPassword',function(value,element){
    return this.optional(element)
    || value.length >= 8
    && /\d/.test(value)
    && /[a-z]/i.test(value);
  },'Your password must be atleast 8 characters long and must contain at least one number and one letter.');

  $("#login_form").validate({
    rules:{
      l_un: {
        required: true
      },
      l_pw: {
        required: true
      }
    }
  });
  $("#register_form").validate({
    rules:{
      r_email: {
        required: true,
        email: true
      },
      r_un: {
        required: true,
        nowhitespace: true
      },
      r_pw: {
        required: true,
        strongPassword: true
      },
      r_rpw: {
        required: true,
        equalTo: "#r_pw"
      }
    }
  });

});
