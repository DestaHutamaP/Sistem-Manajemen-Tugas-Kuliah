const db=require('./config_db')
function insert(){
    const sql = `INSERT INTO USER VALUES (111,qwe,qwe)`;
    const stmt=db.prepare(sql);
    stmt.run((err)=>{
        if(err) throw err;
    })
    console.log("muehehe    ");
    stmt.finalize();
    db.close
}
insert();