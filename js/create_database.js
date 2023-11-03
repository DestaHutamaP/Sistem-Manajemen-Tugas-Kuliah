const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database (__dirname+'/db/manajemen_tugas_kuliah.db', (err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.log('Connected to database');
    }
});

db.serialize(()=>{
    db.run(`
    CREATE TABLE IF NOT EXISTS user (
        NIM INTEGER PRIMAY KEY,
        NAMA TEXT,
        password TEXT
        
    )`,(err)=>{
        if(err){
            console.error(err.message);
        }else{
            console.log('Table successfully created');
        }
    });

    db.run(`
    CREATE TABLE IF NOT EXISTS mata_kuliah(
        id_matkul TEXT PRIMARY KEY,
        Nama TEXT

    )`,(err)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('Nice')
        }
    });

    db.run(`
    CREATE TABLE IF NOT EXISTS tugas(
        id_tugas TEXT PRIMARY KEY,
        id_matkul TEXT, 
        NIM INT, 
        Tenggat Date,
        FOREIGN KEY(id_matkul) REFERENCES mata_kuliah(id_matkul),
        FOREIGN KEY(NIM) REFERENCES user(NIM)

    )`,(err)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('Nice kok')
        }
    });
});

db.close((err)=>{
    if(err){
        console.error(err.message);
    }
});