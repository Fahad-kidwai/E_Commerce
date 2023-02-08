const express = require('express')
const dotenv = require('dotenv').config()
const { connect } = require('mongoose')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/product', require('./routes/productRoutes'))
app.use('/api/supplier', require('./routes/supplierRoutes'))
app.use('/api/purchase', require('./routes/purchaseRoutes'))


app.use(errorHandler)

app.listen(port, ()=> console.log(`Server started on port ${port}`))
