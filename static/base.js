let email_btn = document.getElementById('email-btn')
let email_inp = document.getElementById('email-inp')

email_btn.addEventListener('click', function(){
  let email = document.getElementById('email-inp').value
  send_email_2_server(email)
})

email_inp.addEventListener('input', function(){
  if(check_email(email_inp.value)){
    email_btn.disabled = false;
    email_inp.style.border = "1px green solid"
  } else {
    email_btn.disabled = true;
    email_inp.style.border = "1px red solid"
  }
})

function check_email(email_add){
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_add)){
    return true
  } else {
    return false
  }
}

function send_email_2_server(email){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    let strResponse = "Error: no response from server"
    if(this.readyState == 4 && this.status == 200) {
      content = JSON.parse(xhttp.response);
      clear_input()
      alert(content['message'])
    }
  };
  xhttp.open("PUT", "/api/submit_details", true);
  let email_to_add = JSON.stringify({"Job":"Mailing List", "Email":email})
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(email_to_add);
}

function clear_input(){
  let email_inp = document.getElementById('email-inp');
  email_inp.innerText = "";
  email_inp.value = "";
}