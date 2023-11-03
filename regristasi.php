<!DOCTYPE html>
<html>
<head>
	<title>Registrasi</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="jquery-3.5.1.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
</head>
<body>
<section class="min-vh-100" style="background-color: #2d4d8a;">
<div class="container">
<form action="" method="post">
<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-15 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-4 text-center">

            <div class="mb-md-15 mt-md-15 pb-15">

              <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
              <p class="text-white-50 mb-5">Tolong Masukan Username, Email and Password Anda!</p>

              <div class="form-outline form-white mb-4">
                <p for="username">Username</p>
                <input type="text" name="username" id="username">
              </div>

              <div class="form-outline form-white mb-4">
              <p for="email">Email</p>
                <input type="text" name="email" id="email">
              </div>

              <div class="form-outline form-white mb-4">
              <p for="password">Password</p>
                <input type="password" name="password" id="password">
              </div>

              <div class="form-outline form-white mb-4">
              <p for="password2">Konfirmasi Password</p>
                  <input type="password" name="password2" id="password2">
              </div>
              <button class="btn btn-outline-light btn-lg px-5" type="submit" name="register">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
</form>
</section>
</body>
</html>