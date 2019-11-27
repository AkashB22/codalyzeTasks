let express = require('express');
let api = require('./routes/api');
let app = express();
let cors = require('cors')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/dist/MobileProductApp'));

app.use(cors());
app.use('/api', api);

app.use('/', (req, res, next)=>{
    res.sendFile(__dirname + '/dist/MobileProductApp/index.html');
});

app.use('/', (err, req, res, next)=>{
    res.status(500).json({err})
})
app.listen(3000, ()=>{
    console.log('server is running on port 3000');
})