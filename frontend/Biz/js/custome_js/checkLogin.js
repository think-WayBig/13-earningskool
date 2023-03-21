window.onload = function(){
    
    if(!localStorage.getItem('isLoggedIn')){
        window.location.href="login.html"
    }  
    if(!localStorage.getItem('User')){
        window.location.href="login.html"
    }    
    
}