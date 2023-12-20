const express = require('express');
const cors = require('cors');
const db = require('./database');
const pool = require("./pool");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send(db);
})
app.post('/login/api', (req, res) => {    
    if(!(db.find((user)=> user.username === req.body.email))){              
        db.push({username: req.body.email, name: req.body.name})
    }

})

app.post('/extension-data',(req,res)=>{
    console.log(req.body);
    res.status(204).send();
})

app.get('/user/freq', (req, res)=>{
    res.json(
        {websites: ['https://www.google.com', 'https://www.facebook.com', 'https://www.linkedin.com'],
        data: [{id:1, day: '5 days ago', hours: 2}, {id:2, day: '4 days ago', hours: 4}, {id:3, day: '3 days ago', hours: 7}, {id:4, day: '2 days ago', hours: 3}, {id:4, day: '1 day ago', hours: 4}]        
    }
        )
})

app.get('/user/recommendations', (req, res)=>{
    res.json(
        {websites: ['https://www.youtube.com', 'https://www.amazon.in', 'https://twitter.com']}
    )
})
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running on "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);