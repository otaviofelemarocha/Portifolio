var express =   require("express");  
var multer  =   require('multer');  
const path = require('path');
var fs = require('fs');
var cors = require('cors')
var app = express();
app.use(cors())
const router = express.Router();
let name, directory;

function CreateDir(){
for(let i = 0; i <= 900; i++){
if (!fs.existsSync('./uploads/'+i)){
    fs.mkdirSync('./uploads/'+i);
    return directory = './uploads/'+i;
}}
}
CreateDir()

var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {
    
    callback(null, directory);  
  },  
  filename: function (req, file, cb) {
        cb(null, `${file.originalname}¬${Date.now()}.${path.extname(file.originalname)}`);
    } 
});  

var upload = multer({ storage : storage}) 

router.post('/projects/:start', upload.array('uploadedImages', 10), function(req, res) {
  name = req.params['start']
  if(name == "olamundo") {
  let file = req.files;
  res.end("Arquivos registrados com sucesso !");
  CreateDir()
  }
});

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/html/index.html'));
});
app.use('/', router);

  
app.listen(2000,function(){  
    console.log("Server is running on port 2000");  
});  