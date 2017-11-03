
/*
 * GET users listing.
 exports = anexa uma propriedade(list) fazendo com que receba toda a function
 */
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM user',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('users',{page_title:"users",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_user',{page_title:"Add users"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM user WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_user',{page_title:"Edit users",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the user*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        var query = connection.query("INSERT INTO user set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/users');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.name,
            address : input.address,
            email   : input.email,
            phone   : input.phone 
        
        };
        
        connection.query("UPDATE user set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/users');
          
        });
    
    });
};


exports.delete_user = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM user  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/users');
             
        });
        
     });
};


