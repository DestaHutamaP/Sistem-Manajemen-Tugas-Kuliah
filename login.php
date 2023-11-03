<!DOCTYPE html>

<html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <title>Login Page</title>

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
                <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Log in</h3>
    
                <div class="form-outline mb-4">
                  <label class="form-label" for="email">Email</label>
                  <input type="text" id="email" class="form-control form-control-lg" name="email"/>                  
                </div>
    
                <div class="form-outline mb-4">
                  <label class="form-label" for="password">Password</label>
                  <input type="password" id="password" class="form-control form-control-lg" name="password"/>                  
                </div>
    
                <div class="pt-1 mb-4">
                  <button class="btn btn-info btn-lg btn-block" type="submit" name="login">Login</button>
                </div>

                <p>Tidak Punya Akun? <a href="registrasi.php" class="link-info">Registrasi di sini!</a></p>    
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