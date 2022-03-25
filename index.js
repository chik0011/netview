const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');

const Liste = require('./data/movies.json');


let app = require('express')();
let upload = multer();

app.listen(3000, () => {
console.log('Server launched on port 3000.')
});

app.use(fileupload());
app.use(cors());
app.use('/pages', require('express').static('./client/pages'))
app.use('/assets', require('express').static('./client/assets'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
});

app.get('/movie/card', (req, res) => {
    res.sendFile(__dirname + '/client/pages/cardMovie.html')
});


app.get('/myMovie', (req, res) => {
    res.send(Liste);
})

app.post('/movie/add/img', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const file = Object.values(Object.assign({},req.files))[0];
            
            file.mv(`./client/assets/img/imgMovies/${file.name}`);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/movie/del', (req, res) => {
    let idMovie = req.body.idMovie;
    let delFile = "";
    let movies = [];

    Liste.movies.forEach(element => {
        console.log(element.id);
        if (element.id == idMovie) {
            console.log(element);
            delFile = element.img
        } else {
            movies.push(element);
        }
    });

    if (delFile) {
        fs.readFile('data/movies.json', (err, data) => {
            var json = JSON.parse(data);
            json.movies = movies;               
            fs.writeFileSync("data/movies.json", JSON.stringify(json))
        });

        fs.stat(path.join(__dirname, `/client/assets/img/imgMovies/${delFile}`), function (err, stats) {      
            if (err) {
                return console.error(err);
            }
         
            fs.unlink(path.join(__dirname, `/client/assets/img/imgMovies/${delFile}`),function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
            });
        }); 
    } else {
        console.log("Aucun film supprimé");
    }

    res.sendFile(__dirname + '/client/pages/myMovies.html')
})

app.post('/movie/add', (req, res) => {
    fs.readdir(path.join(__dirname, 'data/'), (err, files) => {

        if (err) {
            return console.log(`le dossier ne peut pas être ouvert ${err}`);
        } 
        else {
            files.forEach((file) => {
                var movie = {
                    id: req.body.id,
                    name: req.body.name, 
                    date: req.body.date, 
                    description: req.body.description, 
                    img: req.body.img,
                }
                 
                fs.readFile('data/movies.json', (err, data) => {
    
                    var json = JSON.parse(data);
                    json.movies.push(movie);
                
                    fs.writeFileSync("data/movies.json", JSON.stringify(json))
                }); 
            });
        }
    });

    res.sendFile(__dirname + '/client/pages/myMovies.html');
}) 

app.post('/movie/update', (req, res) => {
    fs.readdir(path.join(__dirname, 'data/'), (err, files) => {

        if (err) {
            return console.log(`le dossier ne peut pas être ouvert ${err}`);
        } 
        else {
            files.forEach((file) => {
                var movie = {
                    id: req.body.id,
                    name: req.body.name, 
                    date: req.body.date, 
                    description: req.body.description, 
                }
                console.log(movie);
                 
                fs.readFile('data/movies.json', (err, data) => {
                    let moviesTab = [];
                    var json = JSON.parse(data);

                    Liste.movies.forEach(element => {
                        if (element.id == movie.id) {
                            let updateMovie = {
                                id: element.id,
                                name: movie.name,
                                date: movie.date,
                                description: movie.description,
                                img : element.img
                            }
                            moviesTab.push(updateMovie);
                        } else {
                            moviesTab.push(element);
                        }
                    });

                    json.movies = moviesTab;
                
                    fs.writeFileSync("data/movies.json", JSON.stringify(json))
                }); 
            });
        }
    });

    res.sendFile(__dirname + '/client/pages/myMovies.html');
}) 