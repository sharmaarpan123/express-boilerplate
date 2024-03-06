import  express  from 'express';
import  path  from 'path';
import  logger  from 'morgan';

import userRouter from './routes/user.js';
import AuthRouter from './routes/auth.js'
import AdminRouter from './routes/admin.js'
import mongoInit from './models/index.js';
import tokenVerificationMiddleWare from './utils/tokenVerificationMiddleWare.js';



const init = async  () => {


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));


app.use('/auth', AuthRouter 
)
app.use('/user', tokenVerificationMiddleWare ,  userRouter );
app.use('/admin' ,  AdminRouter );

await mongoInit()

app.listen(8000 , () => {
  console.log('server start')
})

}

init()

