import express from 'express'
import morgan from 'morgan'
const app = express()
import cors from 'cors'
const PORT= process.env.PORT || 8000
app.use(cors());
app.use(morgan("tiny"));
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT,error =>{
  if (error)
  console.log(error)
  console.log(`Server is running at http://localhost:${PORT}`)
});