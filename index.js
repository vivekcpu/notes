const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.get('/',(req ,res) =>{

fs.readdir(`./files`,function(err,files){
 res.render("index",{files: files});// we wrote render inside cuz we first want to execute readdir and then want res to render the page...
});
 
});

app.post('/create',(req ,res) =>{
fs.writeFile(`./files/${req.body.title.split(' ' ).join(' ') + ".txt"}`,req.body.details,function(err){
res.redirect("/");  // after creating file we want to redirect to home page... 
})
});

app.post('/edit',(req ,res) =>{
fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
    res.redirect("/");  // after creating file we want to redirect to home page... 
    })
});

//Herew goes... the dynamic routing...
 
app.get('/files/:filename',(req ,res) =>{   
fs.readFile(`./files/${req.params.filename}`,'utf8',function(err,filedata){ //let us see file data by making new page
    
    res.render("show",{filename: req.params.filename , filedata: filedata});
})
});

app.get('/edit/:filename',(req ,res) =>{       
    res.render("edit",{filename: req.params.filename});
});

app.post('/delete/:filename', (req, res) => {
    const filePath = `./files/${req.params.filename}`;
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.send("File does not exist");
        }

        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.send("Error deleting file");
            }

            // Redirect back to home page
            res.redirect('/');
        });
    });
});


app.listen(4000,()=>{
    console.log('Server is running on port http://localhost:4000');
});