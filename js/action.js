$(document).ready(function(){
    $("loginForm").submit(function (e){
        e.preventDefault();

        var nim =$("#NIM").val();
        var password=$("#password").val();

        $.ajax({
            type: "POST",
            url:"./login.php",
            data: {
                NIM : NIM,
                password: password
            },
            success: function (response){
                if(response==="success"){
                    $("#message").html("Login successful.");
                }else{
                    $("#message").html("Login failed. XD");
                }
            }
        });
    });
});