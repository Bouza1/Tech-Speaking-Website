document.addEventListener("DOMContentLoaded", function() {
  set_triggers_on_group('group-1', form_group_1_check)
  set_triggers_on_group('group-2', form_group_2_check)
  set_triggers_on_group('group-3', form_group_3_check)
  set_if_phone_check();
  set_expand_btn('group-1-btn', 'input-1')
  set_expand_btn('group-2-btn', 'input-2')
  set_expand_btn('group-3-btn', 'input-3')
  set_expand_btn('group-4-btn', 'input-4')
})

let submitBtn = document.getElementById('submit-btn')
submitBtn.addEventListener('click', sendData)

function sendData() {
  window.scrollTo(0, 0)
  if(checkName() && checkNumber() && checkEmail() && checkIssues()){
    sendBookingObjToServer()
  } else if(!checkName()){
    displayAlert({"message":"Error: Invalid Name! Please Enter A Name 3 Characters or Longer.", "valid":'danger'})
  } else if(!checkNumber()){
    displayAlert({"message":"Error: Invalid Number! Please Enter A Valid UK Phone Number.", "valid":'danger'})
  } else if(!checkEmail()){
    displayAlert({"message":"Error: Invalid Email! Please Enter A Valid Email Address.", "valid":'danger'})
  } else if(!checkEmail()){
    displayAlert({"message":"Error: Please Enter A More Detailed Description Of The Issue", "valid":'danger'})
  }
}

function set_blur_on_all_required(){
  let required_inputs = document.getElementsByClassName('required')
  for(let i = 0; i < required_inputs.length; i++){
    required_inputs[i].addEventListener('blur', check_all_enable_btn)
  }
}

function change_btn_minus(button){
  var button = document.getElementById(button)
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-dash" viewBox="0 0 16 16"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>'
}

function change_btn_plus(button){
  var button = document.getElementById(button)
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>'
}

function check_all_enable_btn(){
  let submitBtn = document.getElementById('submit-btn')
  if(checkName() && checkNumber() && checkEmail() && checkDevice() && checkMake() && checkModel() && checkIssues()){
    submitBtn.disabled = false;
  } else {
    console.log("Something not working")
    submitBtn.disabled = true;
  }
}

function set_triggers_on_group(group, func_name){
  let form_group = document.getElementsByClassName(group)
  for(let i = 0; i < form_group.length; i++){
    if(i === form_group.length-1){
      form_group[i].addEventListener('change', func_name)
    } else {
      form_group[i].addEventListener('blur', func_name) 
    }
  }
}

function form_group_1_check(){
  if((checkName()) && (checkNumber()) && (checkEmail())){
    let expand_btn_1 = document.getElementById('group-1-btn')
    expand_btn_1.disabled = false; 
    change_btn_plus('group-1-btn')
    let expand_btn_2 = document.getElementById('group-2-btn')
    change_btn_minus('group-2-btn')
    expand_btn_2.disabled = false;
    let group_1 = document.getElementById('input-1')
    let group_2 = document.getElementById('input-2')
    let prog_bar = document.getElementById('prog-bar')
    group_1.style.display = 'none';
    group_2.style.display = "block"
    setTimeout(() => {
      group_2.style.opacity = '1';
    }, 10);
    prog_bar.style.width = "25%";
    prog_bar.innerText = "25%"
  } else {
    let prog_bar = document.getElementById('prog-bar')
    prog_bar.style.width = "10%";
    prog_bar.innerText = "0%"
  }
}

function checkName(){
  let name = document.getElementById('name_inp').value
  let name_check = document.getElementById('name-checkbox')
  if(name.length < 3){
    change_2_cross('name-checkbox')
    return false
  } else if (name. length > 3){
      change_2_tick('name-checkbox')
    return true
  }
}

function checkNumber(){
  let contact_number = document.getElementById('contact_number_inp').value
  if((contact_number[0] == "+") && (contact_number[1] == "4") && (contact_number[2] == "4") && (contact_number[3] == "7") && (contact_number.length == 13)){
    change_2_tick('tel-checkbox')
    return true
  } else if ((contact_number[0] == "0") && (contact_number[1] == "7")  && (contact_number.length == 11)){
    change_2_tick('tel-checkbox')
    return true
  } else {
    change_2_cross('tel-checkbox')
    return false
  }
}

function checkEmail(){
  let email_add = document.getElementById('email_address_inp').value
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_add)){
    change_2_tick('email-checkbox')
    return true
  } else {
    change_2_cross('email-checkbox')
    return false
  }
}

function form_group_2_check(){
  if( (checkDevice()) && (checkMake()) && (checkModel()) ){
    let group_2 = document.getElementById('input-2')
    group_2.style.display = "none";
    let expand_btn_2 = document.getElementById('group-2-btn')
    expand_btn_2.disabled = false; 
    change_btn_plus('group-2-btn')
    let expand_btn_3 = document.getElementById('group-3-btn')
    change_btn_minus('group-3-btn')
    expand_btn_3.disabled = false;
    let group_3 = document.getElementById('input-3')
    let prog_bar = document.getElementById('prog-bar')
    group_3.style.display = "block"
    setTimeout(() => {
      group_3.style.opacity = '1';
    }, 10);
    prog_bar.style.width = "50%";
    prog_bar.innerText = "50%"
  } else {
    let prog_bar = document.getElementById('prog-bar')
    prog_bar.style.width = "25%";
    prog_bar.innerText = "25%"
  } 
}

function checkDevice(){
  let device = document.getElementById('device_type_inp').value
  if(device !== ""){
    return true;
  } else {
    return false;
  }
}

function checkMake(){
  let make = document.getElementById('make_inp').value
  if(make.length > 3){
    change_2_tick('make-checkbox')
    return true;
  } else{
    change_2_cross('make-checkbox')
    return false;
  }
}

function checkModel(){
  let model = document.getElementById('model_inp').value
  if(model.length > 3){
    change_2_tick('model-checkbox')
    return true;
  } else{
    change_2_cross('model-checkbox')
    return false;
  }
}

function form_group_3_check(){
  if(checkIssues()){
    let group_3 = document.getElementById('input-3')
    group_3.style.display = "none";
    let expand_btn_3 = document.getElementById('group-3-btn')
    expand_btn_3.disabled = false; 
    change_btn_plus('group-3-btn')
    let expand_btn_4 = document.getElementById('group-4-btn')
    change_btn_minus('group-4-btn')
    expand_btn_4.disabled = false;
    let group_4 = document.getElementById('input-4')
    let prog_bar = document.getElementById('prog-bar')
    group_4.style.display = "block"
    setTimeout(() => {
      group_4.style.opacity = '1';
    }, 10);
    prog_bar.style.width = "75%";
    prog_bar.innerText = "75%"
    } else {
    let prog_bar = document.getElementById('prog-bar')
    prog_bar.style.width = "50%";
    prog_bar.innerText = "50%"

  } 
}

function checkIssues(){
  let issue = document.getElementById('issues_inp').value
  if(issue.length < 10){
    return false
  } else {
    return true
  }
}

function set_if_phone_check(){
  let radioButtons = document.getElementsByName("method-pref")
  let phone_prefs = document.getElementsByClassName('hidden-phone')
  for(let i = 0; i < radioButtons.length; i++){
    radioButtons[i].addEventListener('click', function(){
      if(this.value === "phone"){
        for(let i=0; i< phone_prefs.length;i++){
          phone_prefs[i].style.display = "block";
        }
      } else {
        for(let i=0; i< phone_prefs.length;i++){
          phone_prefs[i].style.display = "none";
        }
      }
      let prog_bar = document.getElementById('prog-bar')
      prog_bar.style.width = "100%";
      prog_bar.innerText = "100%"
      check_all_enable_btn();
    })
  }
}

function check_check_checked(){
  let radioButtons = document.getElementsByName("method-pref")
  for(let i = 0; i < radioButtons.length; i++){}
    if(this.value === "phone" || this.value === "text" || this.value === "email"){
      return true;
    } else {
      return false;
    }
}

function getContactValue(){
  let email = document.getElementById('email')
  let text = document.getElementById('text')
  let phone = document.getElementById('phone')
  let arr =[email, text, phone]
  for(let i = 0; i < arr.length; i++){
    if(arr[i].checked){
      return arr[i].value
    }
  }
}

function returnBookingObj(){
  let name = document.getElementById('name_inp').value
  let contact_number = document.getElementById('contact_number_inp').value
  let email_add = document.getElementById('email_address_inp').value
  let device = document.getElementById('device_type_inp').value
  let make = document.getElementById('make_inp').value
  let model = document.getElementById('model_inp').value
  let issue = document.getElementById('issues_inp').value
  let pref = 1
  let bookingDeets = {
    "Name":name,
    "Number":contact_number,
    "Email":email_add,
    "Device":device,
    "Make":make,
    "Model":model,
    "Serial":"",
    "Job":"Repair Booking",
    "Issue":issue,
    "Contact Preference":getContactValue()
  }
  return bookingDeets
}

async function sendBookingObjToServer() {
  try {
    const response = await fetch('/api/submit_details', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(returnBookingObj()),
    });

    if (response.ok) {
      const content = await response.json();
      show_message_toast(content);
      clearInputs();
      reset_progress_bar();
      hide_form_groups();
    } else {
      console.error('Error sending booking details to server:', response.status);
    }
  } catch (error) {
    console.error('Error sending booking details to server:', error);
  }
}

function clearInputs(){
  let name = document.getElementById('name_inp')
  let contact_number = document.getElementById('contact_number_inp')
  let email_add = document.getElementById('email_address_inp')
  let device = document.getElementById('device_type_inp')
  let make = document.getElementById('make_inp')
  let model = document.getElementById('model_inp')
  let issue = document.getElementById('issues_inp')
  let email = document.getElementById('email')
  let text = document.getElementById('text')
  let phone = document.getElementById('phone')
  name.innerText = ""
  name.value = ""
  contact_number.innerText = ""
  contact_number.value = ""
  email_add.innerText = ""
  email_add.value = ""
  device.value = ""
  make.innerText = ""
  make.value = ""
  model.innerText = ""
  model.value = ""
  issue.innerText = ""
  issue.value = "" 
  email.checked = false
  text.checked = false
  phone.checked = false
}

function reset_progress_bar(){
  let prog_bar = document.getElementById('prog-bar')
  prog_bar.style.width = "10%";
  prog_bar.innerText = "0%"
}

function hide_form_groups(){
  let group_1 = document.getElementById('input-1')
  let group_1_btn = document.getElementById('group-1-btn')
  group_1_btn.disabled = true;
  change_btn_minus('group-1-btn')
  group_1.style.display = "block";
  reset_form_group('input-2', 'group-2-btn')
  reset_form_group('input-3', 'group-3-btn')
  reset_form_group('input-4', 'group-4-btn')
  let submit_btn = document.getElementById('submit-btn')
  submit_btn.disabled = "true"
}

function reset_form_group(group, btn){
  let group_holder = document.getElementById(group)
  group_holder.style.display = "none";
  let button = document.getElementById(btn)
  button.disabled = true;
  change_btn_plus(btn)

}

function show_message_toast(response) {
  let toastElement = document.getElementById("liveToast")
  let classStr = "toast hide bg-" + response['valid']
  toastElement.setAttribute('class', classStr)
  let toastBody = document.getElementById("toast-body")
  toastBody.innerHTML = ""
  let p_tag = document.createElement('p')
  p_tag.innerText = response['message']
  toastBody.appendChild(p_tag)
  const myToast = new bootstrap.Toast(toastElement);
  myToast.show();
}

function set_expand_btn(button, input_group){
  let expand_btn = document.getElementById(button)
  let group = document.getElementById(input_group)
  expand_btn.addEventListener('click', function(){
    if(isDisplayBlock(group)){
      group.style.display = "none";
      change_btn_plus(button)
    } else {
      group.style.display = "block"
      change_btn_minus(button)
    }
  })
}

function isDisplayBlock(divElement) {
  return divElement.style.display === "block";
}

function change_2_tick(element){
  let icon_2_change = document.getElementById(element)
  icon_2_change.innerHTML = ""
  icon_2_change.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>'
}

function change_2_cross(element){
  let icon_2_change = document.getElementById(element)
  icon_2_change.innerHTML = ""
  icon_2_change.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>'
}