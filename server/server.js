const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const User = require("./model/User")
const bcrypt = require("bcrypt")
const PORT = process.env.PORT || 3001
const saltRounds = 10

//Connect to mongo atlas
mongoose.connect("mongodb+srv://admin-chris:admin1@cluster0.4khty.mongodb.net/tepQuiz", { useNewUrlParser: true})


const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

if (process.env.NODE_ENV==='production'){
    app.use(express.static('../client/build'))
};

const path = require('path');
app.get('*', (req,res)=>{
    const index = path.join('../', __dirname, 'client', 'build', '/index.html')
    res.sendFile(index)
})


const searchDatabase = async function(username){
    try{
        //search DB
        const findUser = await User.findOne({username: username})
        console.log(findUser);
        if (!findUser){
            return {message: 'Error: Username not found'}
        } else{
            return findUser
        }
    }catch(err){
        console.error(err)
    }
}

const checkPassword = async function(foundUser, input){
    console.log(`checking input${input} vs ${foundUser}`)
    
    bcrypt.compare(foundUser, input, function(err, isMatch){
        console.log(isMatch);
        if(err){
            throw err
        }
        if (!isMatch){
            return false
        }
        if (isMatch) {
            return true
        }
    })
}


const handleLogin = async function(req,res){
    try{
        const loginUsername = req.body.username
        const loginPassword = req.body.password
        const hash = await bcrypt.hashSync(loginPassword, saltRounds)

        const foundUser = await searchDatabase(loginUsername)
        
        console.log('Found:');
        console.log(foundUser)

        //if no message, then validate pw
        if (foundUser.message===undefined){
           
            //validate password
            const validPassword = await bcrypt.compareSync(loginPassword, foundUser.password,  (err, res)=>{
                if(err){
                    throw err
                } else{
                    console.log('Res:');
                    console.log(res);
                    return res
                }
            })

            if (validPassword){
                res.send({userData: foundUser, validPassword: validPassword})
            } else {
                res.send({message: 'Error: Incorrect password'})
            } 
                
            
        } else {
            res.send({message: 'Error: Username not found'})
        }
    }catch(err){
        console.error(err)
    }
}


//Api route
//Sign Up API
app.post('/login', handleLogin)


const retrieveData = async function(req,res){
    try{
        const data = await User.find({});
        console.log(data)
        const jsonData = data.json();

        res.json(data);
    }catch(err){
            console.error(err);
        }
}

//////////Fetch database for leaderboard
app.get('/database', retrieveData);


app.post('/signup', (req,res)=> {
    console.log(req.body);

    const username = req.body.username
    const password = req.body.password
    //hashing password function
    const hash = bcrypt.hashSync(password, saltRounds)
    //score to add from front end ?
    
    User.findOne( {username: username}, async function(err, foundUser) {
        console.log('seraching');
        if (err) {
            console.log(err)
        } else if(foundUser){
            console.log('already has account');
            res.send({message: "Error, user already has an account"})
        } else {
            const newUser = new User({
                username: username,
                //password is hash before adding to mongoDB
                password : hash,
                score: 0
            })
            newUser.save()
            .catch((err)=> console.log(err))
            console.log(newUser)

            if (res.statusCode === 200) {
                res.json(newUser)
            }
            else {
                res.send({message:"failed to added to database"})
            }
        }
    })

})

const saveScore = async function(req, res){
    
}

app.post('/saveScore', (req,res)=>{
    
    const username = req.body.username
    const score = req.body.score
    User.updateOne({username: username}, {score: score}, async function(err, doc){
        if (err){
            console.log(err)
        } else{
            console.log(doc);
            console.log('Updated User Score')
        }
    })
})


app.listen(PORT , ()=> {
    console.log("server is running at port 3000")
})