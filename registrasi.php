<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Registrasi</title>
    
    <!-- <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="jquery-3.5.1.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script> -->

    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <script src="bootstrap/js/bootstrap.min.js"></script>
  </head>

  <body>
    <section class="vh-100">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 text-black">
            <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">    
              <form style="width: 23rem;" action="index.php" method="POST">    
                <h2 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register</h2>
                <p>Tolong Masukan Username, Email and Password Anda!</p><br><br>
    
                <div class="form-outline mb-4">
                  <label class="form-label" for="username">Username</label>
                  <input type="text" name="username" class="form-control form-control-lg" id="username">
                </div>
    
                <div class="form-outline mb-4">
                  <label class="form-label" for="email">Email</label>
                  <input type="text" name="email" class="form-control form-control-lg" id="email">
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="password">Password</label>
                  <input type="password" name="password" class="form-control form-control-lg" id="password">
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="password2">Konfirmasi Password</label>
                  <input type="password" name="password2" class="form-control form-control-lg" id="password2">
                </div>
    
                <div class="pt-1 mb-4">
                  <button class="btn btn-info btn-lg btn-block" type="submit" name="login">Register</button>
                </div>   
              </form>
            </div>    
          </div>

          <div class="col-sm-6 px-0 d-none d-sm-block">
            <img src="asset/logo.png" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
          </div>
        </div>
      </div>
    </section>
  </body>
</html>