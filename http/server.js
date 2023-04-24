const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req , res) => {

    // pegando o valor da url  caso seja barra o aquivo sera a index.html 
    const file = req.url === '/' ? 'index.html' : req.url;
    // criando o caminho para o aquivo html de retorno 
    const filePath = path.join(__dirname , 'public', file);
    
    //
    const extname = path.extname(filePath);


    //tipos de extenções 
    const allowedFileTypes = ['.html' , '.css' , '.js' , '.ico'];

    const allowed = allowedFileTypes.find(item => item == extname)

    if(!allowed) return;

    
        fs.readFile(
            filePath,
            (err , contend) => {
                  if(err) throw err
                  res.end(contend);
            }
        );
    
    
}).listen(5000, () => console.log('Server is running'));