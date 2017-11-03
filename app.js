
/**
 * Dependencias.
 */
var http = require('http'); //biblioteca para fazer requisições http
var express = require('express'); //express 
var path = require('path');// facilitar a manipulação de caminhos

//carregando a rota users e index
var users = require('./routes/users');

//pegando a função retornada pelo express
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

//porta em que nosso servidor será montado
app.set('port', process.env.PORT || 4300);
//path das nossas views
app.set('views', path.join(__dirname, 'views'));
//informa ao express que o engine de view agora é o ejs
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    Conexão com banco de dados
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost', //'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //ṕorta padrão
        database:'nodecrud'

    }) //or single

);



app.get('/', users.list);
app.get('/users', users.list);
app.get('/users/add', users.add);
app.post('/users/add', users.save);
app.get('/users/delete/:id', users.delete_user);
app.get('/users/edit/:id', users.edit);
app.post('/users/edit/:id',users.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Sistema rodando na porta ' + app.get('port'));
});
