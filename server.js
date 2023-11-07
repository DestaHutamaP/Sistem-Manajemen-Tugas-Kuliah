const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const port = 3000;

const db = new sqlite3.Database('db/sistem_manajemen_tugas_kuliah.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)');
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/registrasi', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registrasi.html'));
});

app.post('/task', (req, res) => {
  const userEmail = req.body.email;
  const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';

  db.get(sql, [userEmail], (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      if (row.count > 0) {
        db.get('SELECT * FROM users WHERE email = ?', userEmail, (err, row) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('email atau password salah!');
          } else {
            if(req.body.password === row.password) {
              res.redirect(`/task/${row.id}`);
            } else {
              res.status(400).send(`email atau password salah!`);
            }
          }
        });        
      } else {
        res.status(400).send(`email atau password salah!`);        
      }
    }
  });    
});

app.get('/task/:id', (req, res) => {
  const userId = req.params.id;

  if (userId) {
    db.get('SELECT * FROM users WHERE id = ?', userId, (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan dalam mengambil data pengguna.');
      } else {
          db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS user${row.id} (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT, deadline DATE)`);

            db.all(`SELECT * FROM user${row.id} ORDER BY deadline ASC, id ASC`, (err, rows) => {
              if (err) {
                console.error(err.message);
                res.status(500).send('Terjadi kesalahan dalam mengambil data task!');
              } else {
                const tableRows = rows.map(task => `
                  <tr>
                    <td>${task.id}</td>
                    <td>${task.nama}</td>
                    <td>${task.deadline}</td>
                    <td>
                      <form method="POST" action="/task/edit">
                        <input type="hidden" name="id" value="${task.id}">
                        <input type="hidden" name="user_id" value="${userId}">
                        <button class="btn btn-info btn-lg btn-block" type="submit">Edit</button>
                      </form>
                    </td>
                    <td>
                      <form method="POST" action="/task/hapus" onSubmit="return konfirmasiHapus()">
                        <input type="hidden" name="id" value="${task.id}">
                        <input type="hidden" name="user_id" value="${userId}">
                        <button class="btn btn-danger btn-lg btn-block" type="submit">Hapus</button>
                      </form>
                    </td>
                  </tr>
                `).join('');
          
                const html = `
                  <html>
                    <head>
                      <title>Task</title>
          
                      <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
                      <script src="../bootstrap/js/bootstrap.min.js"></script>
          
                      <script>
                        function konfirmasiHapus() {
                          var konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus user ini?");
                          if (konfirmasi) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      </script>            
          
                      <style>
                        table {
                          border-collapse: collapse;
                          width: 100%;
                        }
          
                        th, td {
                          border: 1px solid black;
                          padding: 8px;
                          text-align: left;
                        }
          
                        .tombol {
                          position: fixed;
                          bottom: 10px; 
                          left: 10px;  
                        }
  
                        .tombol2 {
                          position: fixed;
                          top: 10px; 
                          right: 10px;  
                        }
                      </style>      
                    </head>
                    <body>
                      <form method="POST" action="/task/simpan">
                        <input type="hidden" name="id" value="${userId}">
                        <button class="btn btn-info btn-lg btn-block tombol" type="submit">Tambah Task</button>
                      </form>
                      <a href="/" class="btn btn-danger btn-lg btn-block tombol2" name="Logout">Logout</a>  
  
                      <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Hai, ${row.username}</h3>
  
                      <h1>Task</h1>
                      <table>
                        <tr>
                          <th>ID</th>
                          <th>Nama Tugas</th>
                          <th>Deadline</th>
                          <th>Edit</th>
                          <th>Hapus</th>
                        </tr>
                        ${tableRows}                          
                `;
          
                res.send(html);
              }
            });
          });                          
      }
    });
  } else {
    res.status(400).send('email atau password anda salah!');
  }
});

app.post('/task/edit', (req, res) => {
  const taskId = req.body.id;
  const userId = req.body.user_id;

  if (taskId) {
    // Redirect ke halaman edit dengan menyertakan ID pengguna
    res.redirect(`/task/edit/${userId}/${taskId}`);
  } else {
    res.status(400).send('ID task tidak valid.');
  }
});

app.get('/task/edit/:user_id/:task_id', (req, res) => {
  const userId = req.params.user_id;
  const taskId = req.params.task_id;

  if (userId) {
    db.get(`SELECT * FROM user${userId} WHERE id = ?`, taskId, (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan dalam mengambil data task!');
      } else {
        const html = `
          <html>
            <head>
              <title>Edit Task</title>

              <link rel="stylesheet" href="../../../bootstrap/css/bootstrap.min.css">
              <script src="../../../bootstrap/js/bootstrap.min.js"></script>
            </head>
            <body>
              <section class="vh-100">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-sm-6 text-black">
                      <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">    
                        <form style="width: 23rem;" action="/task/simpan/${userId}" method="POST">       
                          <h2 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Edit User</h2>

                          <input type="hidden" name="id" value="${row.id}">                                           

                          <div class="form-outline mb-4">
                            <label class="form-label" for="nama_tugas">Nama Tugas</label>
                            <input type="text" name="nama_tugas" value="${row.nama}" class="form-control form-control-lg" id="nama_tugas" required>
                          </div>
              
                          <div class="form-outline mb-4">
                            <input type="date" id="datepicker" value="${row.deadline}" class="form-control form-control-lg" name="datepicker"  required>
                          </div>          
              
                          <div class="pt-1 mb-4">
                            <button class="btn btn-info btn-lg btn-block" type="submit" name="simpan">Simpan</button>
                          </div>   
                        </form>
                      </div>    
                    </div>
          
                    <div class="col-sm-6 px-0 d-none d-sm-block">
                      <img src="../../../asset/logo.png" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
                    </div>
                  </div>
                </div>
              </section>
            </body>
          </html>
        `;

        res.send(html);
      }
    });
  } else {
    res.status(400).send('ID pengguna tidak valid.');
  }
});

app.post('/task/simpan/:id', (req, res) => {
  const userId = req.params.id;
  const taskId = req.body.id;
  const newName = req.body.nama_tugas;
  const newDeadline = req.body.datepicker;

  if (taskId && newName && newDeadline) {
    db.run(`UPDATE user${userId} SET nama = ?,  deadline = ? WHERE id = ?`, [newName, newDeadline, taskId], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan dalam menyimpan task!');
      } else {
        res.redirect(`/task/${userId}`);
      }
    });
  } else {
    res.status(400).send('task tidak valid.');
  }
});

app.post('/task/simpan', (req, res) => {
  const userId = req.body.id;

  if (userId) {
    res.redirect(`/task/simpan/${userId}`);
  } else {
    res.status(400).send('error!');
  }
});

app.get('/task/simpan/:id', (req, res) => {
  const userId = req.params.id;

  const html = `
    <html>
      <head>
        <title>Tambah task</title>

        <link rel="stylesheet" href="../../bootstrap/css/bootstrap.min.css">
        <script src="../../bootstrap/js/bootstrap.min.js"></script>
      </head>
      <body>
        <section class="vh-100">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6 text-black">
                <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">    
                  <form style="width: 23rem;" action="/task/tambah/${userId}" method="POST">       
                    <h2 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Tambah Task</h2>                    

                    <div class="form-outline mb-4">
                      <label class="form-label" for="nama_tugas">Nama Tugas</label>
                      <input type="text" name="nama_tugas" class="form-control form-control-lg" id="nama_tugas" required>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="date" id="datepicker" name="datepicker" class="form-control form-control-lg" required>
                    </div>        
        
                    <div class="pt-1 mb-4">
                      <button class="btn btn-info btn-lg btn-block" type="submit" name="simpan">Simpan</button>
                    </div>   
                  </form>
                </div>    
              </div>
    
              <div class="col-sm-6 px-0 d-none d-sm-block">
                <img src="../../asset/logo.png" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  `;

  res.send(html);
});

app.post('/task/tambah/:id', (req, res) => {
  const userId = req.params.id;
  const { nama_tugas, datepicker } = req.body;

  if (nama_tugas && datepicker) {
    const query = `INSERT INTO user${userId} (nama, deadline) VALUES (?, ?)`;

    db.run(query, [nama_tugas, datepicker], (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.redirect(`/task/${userId}`);
    });
  } else {
    res.status(400).send('Error');
  }
});

app.post('/task/hapus', (req, res) => {
  const taskId = req.body.id;
  const userId = req.body.user_id;

  if (userId) {
    db.run(`DELETE FROM user${userId} WHERE id = ?`, taskId, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan dalam menghapus data task.');
      } else {
        res.redirect(`/task/${userId}`);
      }
    });
  } else {
    res.status(400).send('ID task tidak valid.');
  }
});

app.post('/', (req, res) => {
  const { username, password, email } = req.body;
  const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';

  db.get(sql, [email], (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      // Jika count lebih dari 0, berarti email sudah digunakan
      if (row.count > 0) {
        res.status(400).send(`Email ${email} sudah digunakan.`);
      } else {
        const query = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;

        db.run(query, [username, password, email], (err) => {
          if (err) {
            return res.status(500).send(err.message);
          }
          res.redirect('/');
        });
      }
    }
  });  
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  // Query untuk mendapatkan data pengguna dari database
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Terjadi kesalahan dalam mengambil data pengguna.');
    } else {
      // Menampilkan data pengguna dalam tabel HTML dengan tombol edit dan hapus
      const tableRows = rows.map(user => `
        <tr>
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>
            <form method="POST" action="/users/edit">
              <input type="hidden" name="id" value="${user.id}">
              <button class="btn btn-info btn-lg btn-block type="submit">Edit</button>
            </form>
          </td>
          <td>
            <form method="POST" action="/users/hapus" onSubmit="return konfirmasiHapus()">
              <input type="hidden" name="id" value="${user.id}">
              <button class="btn btn-danger btn-lg btn-block type="submit">Hapus</button>
            </form>
          </td>
        </tr>
      `).join('');

      const html = `
        <html>
          <head>
            <title>Users</title>

            <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
            <script src="bootstrap/js/bootstrap.min.js"></script>

            <script>
              function konfirmasiHapus() {
                var konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus user ini?");
                if (konfirmasi) {
                  return true;
                } else {
                  return false;
                }
              }
            </script>            

            <style>
              table {
                border-collapse: collapse;
                width: 100%;
              }

              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }

              .tombol {
                position: fixed;
                bottom: 10px; 
                left: 10px;  
              }
            </style>      
          </head>
          <body>
            <a href="/" class="btn btn-info btn-lg btn-block tombol" name="Back">Back</a>

            <h1>Users</h1>
            <table>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Hapus</th>
              </tr>
              ${tableRows}
      `;

      res.send(html);
    }
  });
});

app.post('/users/edit', (req, res) => {
  const userId = req.body.id;

  if (userId) {
    // Redirect ke halaman edit dengan menyertakan ID pengguna
    res.redirect(`/users/edit/${userId}`);
  } else {
    res.status(400).send('ID pengguna tidak valid.');
  }
});

// Halaman edit data pengguna
app.get('/users/edit/:id', (req, res) => {
  const userId = req.params.id;

  if (userId) {
    // Query untuk mendapatkan data pengguna berdasarkan ID
    db.get('SELECT * FROM users WHERE id = ?', userId, (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan dalam mengambil data pengguna.');
      } else {
        // Menampilkan formulir edit dengan data pengguna yang ada
        const html = `
          <html>
            <head>
              <title>Edit User</title>

              <script>
                function validateForm() {
                    var password = document.getElementById("password").value;
                    var confirmPassword = document.getElementById("confirm_password").value;

                    if (password !== confirmPassword) {
                        alert("Password dan konfirmasi password tidak cocok");
                        return false;
                    }
                    
                    return true;
                }
              </script>

              <style>
                .tombol {
                    position: fixed;
                    bottom: 10px; 
                    left: 10px;  
                }
              </style>

              <link rel="stylesheet" href="../../bootstrap/css/bootstrap.min.css">
              <script src="../../bootstrap/js/bootstrap.min.js"></script>
            </head>
            <body>
              <section class="vh-100">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-sm-6 text-black">
                      <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">    
                        <form style="width: 23rem;" action="/users/simpan" method="POST" onsubmit="return validateForm()">       
                          <h2 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Edit User</h2>

                          <input type="hidden" name="id" value="${row.id}">                         

                          <div class="form-outline mb-4">
                            <label class="form-label" for="username">Username</label>
                            <input type="text" name="username" value="${row.username}" class="form-control form-control-lg" id="username" required>
                          </div>
              
                          <div class="form-outline mb-4">
                            <label class="form-label" for="email">Email</label>
                            <input type="email" name="email" value="${row.email}" class="form-control form-control-lg" id="email" required>
                          </div>
          
                          <div class="form-outline mb-4">
                            <label class="form-label" for="password">Password</label>
                            <input type="password" name="password" class="form-control form-control-lg" id="password" required>
                          </div>
          
                          <div class="form-outline mb-4">
                            <label class="form-label" for="confirm_password">Konfirmasi Password</label>
                            <input type="password" name="confirm_password" class="form-control form-control-lg" id="confirm_password" required>
                          </div>
              
                          <div class="pt-1 mb-4">
                            <button class="btn btn-info btn-lg btn-block" type="submit" name="simpan">Simpan</button>
                          </div>   
                        </form>
                      </div>    
                    </div>
          
                    <div class="col-sm-6 px-0 d-none d-sm-block">
                      <img src="../../asset/logo.png" alt="Login image" class="w-100 vh-100" style="object-fit: cover; object-position: left;">
                    </div>
                  </div>
                </div>
              </section>
            </body>
          </html>
        `;

        res.send(html);
      }
    });
  } else {
    res.status(400).send('ID pengguna tidak valid.');
  }
});

// Handler untuk permintaan penyimpanan data pengguna yang telah diedit
app.post('/users/simpan', (req, res) => {
  const userId = req.body.id;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newpassword = req.body.password;

  if (userId && newUsername && newEmail && newpassword) {
    // Update data pengguna dalam database berdasarkan ID
    db.run('UPDATE users SET username = ?,  email = ?, password = ? WHERE id = ?', [newUsername, newEmail, newpassword, userId], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan dalam menyimpan data pengguna.');
      } else {
        res.redirect('/users');
      }
    });
  } else {
    res.status(400).send('Data pengguna tidak valid.');
  }
});

// Handler untuk permintaan penghapusan data
app.post('/users/hapus', (req, res) => {
  const userId = req.body.id;

  if (userId) {
    // Hapus data pengguna dari database berdasarkan ID
    db.run('DELETE FROM users WHERE id = ?', userId, (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan dalam menghapus data pengguna.');
      } else {
        res.redirect('/users');
      }
    });
  } else {
    res.status(400).send('ID pengguna tidak valid.');
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});