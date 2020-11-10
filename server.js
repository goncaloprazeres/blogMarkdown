if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true },{ 
  useUnifiedTopology: true })
  const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.set('view engine','ejs')

app.use(express.urlencoded({extended: false}))



app.get('/',(req,res)=>{
    const createdAt =  new Date() 
    const articles = [{
        title : 'Test article',
        createdAt: createdAt.getDate() + "/" + (createdAt.getMonth() + 1) + "/" + createdAt.getFullYear(),
        description: 'Test description'
    }]
    res.render('articles/index',{articles : articles})
})


app.use('/articles',articleRouter)
app.listen(process.env.PORT || 3000)