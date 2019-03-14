/* Created By: Gerardo Rivera(github.com/gearlo) for Atlas Home */


var data = { "name":"r", "lastname":"s", "mail":"t", "phone1":"u", "phone2":"v", "avatar":"w", "states":[], "banks":[], "notifications":[] }
var validations = { "mail": 0, "phone": 0}


$( document ).ready( ()=> {
    $.getJSON("data.json", (json)=> {
      data = json;
      profileView();

      $("#button-edit").click( profileEdit );
      $("#button-save").click( profileSave );
      $("#button-cancel").click( ()=>{
        let validation = $(".validation-text");
        validation.removeClass("validation-wait");
        validation.removeClass("validation-bad");
        validation.addClass("validation-good");
        validation.html('verificado');
        profileView();
      } );
      $(".switch-profile").click( ()=>{ switch_tab("profile") } );
      $(".switch-states").click( ()=>{ switch_tab("states") } );
      $(".switch-offert").click( ()=>{ switch_tab("offert") } );
      $(".switch-banks").click( ()=>{ switch_tab("banks") } );
      $(".switch-notifications").click( ()=>{ switch_tab("notifications") } );
      $(".switch-preferences").click( ()=>{ switch_tab("preferences") } );

      $("#form-phone1").on("keyup", ( validatePhone ) );
      $("#form-phone2").on("keyup", ( validatePhone ) );
      $("#form-mail").on("keyup", ( validateMail ) );

      $("#navBarM-show").click( ()=> { $(".dashboard-options-mb").show() } );
      $(".dashboard-options-mb").click( ()=> { $(".dashboard-options-mb").hide() } );

      if(data['notifications'].length)
        $(".notifications-number").html(' ' + data['notifications'].length + ' ');
      else
        $(".notifications-number").hide();

    });
});


function phoneFilter(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
      //validatePhone();

}

function mailFilter(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|[a-z]|[A-Z]|\@|\.|\_/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function validatePhone(){
  var regex = /[0-9]{8}$/;
  let text1 = $("#form-phone1").val();
  let text2 = $("#form-phone1").val();
  let validation = $(".validation-phone");
  let save = $("#button-save");

  validation.removeClass("validation-good");
  validation.removeClass("validation-wait");
  validation.removeClass("validation-bad");

  if( !regex.test(text1) || !regex.test(text2) ){
    validation.addClass("validation-bad");
    validation.html('no válido');
    save.prop("disabled",true);
  }else {
    validation.addClass("validation-wait");
    validation.html('no verificado');
    save.prop("disabled",false);
  }
}

function validateMail(){
  var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  let text = $("#form-mail").val();
  let validation = $(".validation-mail");
  let save = $("#button-save");

  validation.removeClass("validation-good");
  validation.removeClass("validation-wait");
  validation.removeClass("validation-bad");

  if( !regex.test(text) ){
    validation.addClass("validation-bad");
    validation.html('no válido');
    save.prop("disabled",true);
  }else {
    validation.addClass("validation-wait");
    validation.html('no verificado');
    save.prop("disabled",false);
  }
}

function profileEdit(){
  switch_tab("profile");
  $('.profile-view').addClass('HIDDEN');
  $('.profile-edit').removeClass('HIDDEN');

  $("#form-name").val( data["name"] );
  $("#form-lastname").val( data["lastname"] );
  $("#form-mail").val( data["mail"] );
  $("#form-phone1").val( data["phone1"] );
  $("#form-phone2").val( data["phone2"] );

  $("#form-phone1").keypress(phoneFilter);
  $("#form-phone2").keypress(phoneFilter);
  $("#form-mail").keypress(mailFilter);
  $("#button-save").prop("disabled",false);
}

function profileView(){
  switch_tab("profile");
  $('.profile-edit').addClass('HIDDEN');
  $('.profile-view').removeClass('HIDDEN');

  $("#form-name-v").html( data["name"] );
  $("#form-lastname-v").html( data["lastname"] );
  $("#form-mail-v").html( data["mail"] );
  $("#form-phone-v").html( data["phone1"] + '<br>' +  data["phone2"]);

  $(".profile-avatar").attr("src", data["avatar"]);
  $(".avatar-name").html( data["name"] + ' ' + data["lastname"]);
  $("#accountName").html( data["name"] );
}

function profileSave(){
  data["name"] = $("#form-name").val();
  data["lastname"] = $("#form-lastname").val();
  data["mail"] = $("#form-mail").val();
  data["phone1"] = $("#form-phone1").val();
  data["phone2"] = $("#form-phone2").val();

  profileView();
}


function showStates(states, offerts = false ){
  let cardHtml = ''+
    '<div class="row state-card">' +
    '  <div class="col-12 col-lg-4 col-xl-3 state-card-img"> ' +
        '<img class="card-img-top" src="{{image}}">'+
      '</div>'+
      '<div class="col-12 col-lg-8 col-xl-9">'+
        '<div class="card-body">'+
          '<h5 class="card-title">{{name}}</h5><span style="color: darkorange">{{obs}}</span>'+
          '<p class="card-text DSK">{{desc}}</p>'+
          '<hr>'+
          '<div class="state-card-spec text-center">'+
            '<div>Precio: <br> Lps.{{price}} </div>'+
            '<div>Habs <br> {{habs}} </div>'+
            '<div>Baños: <br> {{bath}} </div>'+
            '<div>Área: <br> {{area}} </div>'+
            '<div class="text-right DSK" style="width:100%"> <br> <button type="button" class="btn btn-dark btn-sm">Editar</button> </div>'+
          '</div>'+

        '</div>'+
      '</div>'+
    '</div>\n';

  $('.states-list').html('');
  $('.offert-content').html('');

  if( !states.length ){
    $('.states-list').html('<div class="text-center"><h5 class="LGRAY"> NO TIENES INMUEBLES </h5></div>');
    $('.offert-content').html('<div class="text-center"><h5 class="LGRAY"> NO TIENES INMUEBLES </h5></div>');
  }else
    states.forEach( (element)=>{
        let newCard = cardHtml.replace("{{image}}", element["image"]);
        newCard = newCard.replace("{{name}}", element["name"]);
        newCard = newCard.replace("{{desc}}", element["desc"]);
        newCard = newCard.replace("{{price}}",element["price"]);
        newCard = newCard.replace("{{habs}}", element["habs"]);
        newCard = newCard.replace("{{bath}}", element["bath"]);
        newCard = newCard.replace("{{area}}", element["area"]);
        newCard = newCard.replace("{{obs}}", element["offert"] ? '(En Oferta)':'' );

        if(!offerts)
          $('.states-list').html( $('.states-list').html() + newCard);
        else if( element["offert"] )
          $('.offert-content').html( $('.offert-content').html() + newCard);

  });

}

function showBanks(){
  let banksHtml = ''+
  '<div class="back LIST">'+
    '<i class="text-center"> <span class="fas fa-home align-middle"></span> </i>  &nbsp; <a>{{name}}</a></br>'+
  '</div><hr style="margin-top:2px; margin-bottom:2px">\n';


  if( !data["banks"].length )
    $('.banks-content').html('<div class="text-center"><h5 class="LGRAY"> NO TIENES BANCOS </h5></div>');
  else{
    $('.banks-content').html('<hr style="margin-top:2px; margin-bottom:2px">');
    data["banks"].forEach( (element) => {
      let newBank = banksHtml.replace("{{name}}", element["name"]);
      $('.banks-content').html( $('.banks-content').html() + newBank);
    } );
  }
}

function showNotifications(){
  let banksHtml = ''+
  '<div class="back LIST">'+
    '<i class="text-center"> <span class="fas fa-envelope align-middle"></span> </i>  &nbsp; <a>{{desc}}</a></br>'+
  '</div><hr style="margin-top:2px; margin-bottom:2px">\n';

  if( !data["notifications"].length )
    $('.notifications-content').html('<div class="text-center"><h5 class="LGRAY"> NO TIENES NOTIFICACIONES </h5></div>');
  else{
    $('.notifications-content').html('<hr style="margin-top:2px; margin-bottom:2px">');
    data["notifications"].forEach( (element) => {
      let newBank = banksHtml.replace("{{desc}}", element["desc"]);
      $('.notifications-content').html( $('.notifications-content').html() + newBank);
    } );
  }
}


async function switch_tab(tab){
  let tabsContent = [
    ".states-list",
    ".profile-edit-form",
    ".profile-info",
    ".preferences-content",
    ".offert-content",
    ".banks-content",
    ".notifications-content"
  ];

  $(".profile-info").removeClass("d-md-block");

  $(".tab-content").addClass('HIDDEN');
  $(".dashboard-option").removeClass('focus');

  switch (tab) {
    case "profile":
      $(".profile-edit-form").removeClass('HIDDEN');
      $(".profile-info").addClass("d-md-block");
      $(".profile-info").removeClass("HIDDEN");
      $(".switch-profile").addClass('focus');
      break;

    case "states":
      $(".states-list").removeClass('HIDDEN');
      $(".switch-states").addClass('focus');
      showStates(data["states"]);
      break;

    case "preferences":
      $(".preferences-content").removeClass('HIDDEN');
      $(".switch-preferences").addClass('focus');
      break;

    case "offert":
      $(".offert-content").removeClass('HIDDEN');
      $(".switch-offert").addClass('focus');

      showStates(data["states"], true);
      break;

    case "banks":
      $(".banks-content").removeClass('HIDDEN');
      $(".switch-banks").addClass('focus');
      showBanks();
      break;

    case "notifications":
      $(".notifications-content").removeClass('HIDDEN');
      $(".switch-notifications").addClass('focus');
      showNotifications();
      break;

    default:
  }

}
