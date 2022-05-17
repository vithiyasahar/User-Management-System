
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
     host            :process.env.DB_HOST,
     user            :process.env.DB_USER,
     password        :process.env.DB_PASS,
     database        :process.env.DB_NAME
    

});











// View users

exports.view =(req,res)=>{
    


    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT*FROM user where status = "active"',(err,rows)=>{

            connection.release();

            if(!err){
                let removedUser = req.query.removed;
                res.render('home',{rows,removedUser});
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });

}

    //search the users given first name or Last Name
exports.find =(req,res)=>{
    


    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('SELECT * FROM user where first_name LIKE ? OR last_name LIKE ?', ['%'+ searchTerm + '%','%'+ searchTerm + '%'], (err,rows)=>{

            connection.release();

            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });
}
  

exports.form =(req,res)=>{
    res.render('add-user');

}
 // create users
exports.create =(req,res)=>{

    const { first_name,last_name,email,phone,comments} = req.body;

    

    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);
        let searchTerm = req.body.search;

        

        connection.query('INSERT INTO user SET first_name = ?,last_name = ?,email =?,phone =?,comments =?',[first_name,last_name,email,phone,comments], (err,rows)=>{

            connection.release();

            if(!err){
                res.render('add-user', {alert :'User added successfully'} );
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });

   
}
// edit users
 exports.edit =(req,res)=>{


    
    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT*FROM user where id = ?',[req.params.id],(err,rows)=>{

            connection.release();

            if(!err){
                res.render('edit-user',{rows});
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });
  


 }



// update users
exports.update =(req,res)=>{


    const { first_name,last_name,email,phone,comments} = req.body;
    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);

        connection.query('UPDATE user SET first_name =?, last_name =?, email =?,phone =?, comments =? where id = ?',[first_name,last_name,email,phone,comments,req.params.id],(err,rows)=>{

            connection.release();

            if(!err){

                
    
    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT*FROM user where id = ?',[req.params.id],(err,rows)=>{

            connection.release();

            if(!err){
                res.render('edit-user',{rows, alert:`${first_name} updated sucessfully !`});
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });
  
                
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });
  


 }


 
// delete users
exports.delete =(req,res)=>{


    
    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);

        connection.query('DELETE FROM user where id = ?',[req.params.id],(err,rows)=>{

            connection.release();

            if(!err){
                let removedUser = encodeURIComponent('User SucessFully removed.')
                res.redirect('/?removed=' + removedUser );
                
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });
  


 }

 
// View all details user

exports.viewall =(req,res)=>{
    


    pool.getConnection((err,connection)=>{
        if(err)throw err; // not connceted
        console.log('Connected as ID' + connection.threadId);

        connection.query('SELECT*FROM user where id =?',[req.params.id],(err,rows)=>{

            connection.release();

            if(!err){
                res.render('view-user',{rows});
            }else{
                console.log(err);
            }

         console.log('The data from user table:\n',rows);



        });

    });

}





