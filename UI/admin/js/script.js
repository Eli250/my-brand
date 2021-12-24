function login(){
    var username = document.forms["myForm"]["uname"].value;
    var password = document.forms["myForm"]["passwd"].value;
    if(username=="Admin" && password=="1234"){
        window.location.href="../admin/dashboard.html"; 
    }else{
        alert("Invalid Username or Password");
    }
}