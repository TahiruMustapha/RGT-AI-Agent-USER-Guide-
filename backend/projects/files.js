//Writing files in js
const fs = require('fs');

fs.writeFile('./docs/blog1.txt','hello world',()=>{
    console.log('file was written');

});

fs.writeFile('./docs/blog2.txt','hello world',()=>{
    console.log('file was written');

});

//Reading files in js
fs.readFile('./docs/blog1.txt',(err,data)=>{
    if(err){
        console.log(err);
  
    }
          if(data){
            console.log(data.toString());
        }
});
// Creating directories

fs.mkdir('./gallary',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('folder created');
    }
});
