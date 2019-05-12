const app = require('express')();
const index = require('../routes/index');
const users = require('../routes/users');

const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//  Connect all our routes to our application
app.use('/pcs', index);
app.use('/users', users);

app.listen(process.env.PORT || 8081)