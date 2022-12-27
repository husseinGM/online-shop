const express = require('express');
const Product = require('./models/product');
const path = require('path');
const homeRouter = require('./routes/homeRouter');
const productRouter = require('./routes/productRouter');
const authRouter = require('./routes/authRouter');
const cartRouter = require('./routes/cart.route');
const adminRouter = require('./routes/adminRouter');
const flash = require('connect-flash');
//const dbURL = 'mongodb+srv://hussein:python1221@cluster0.3tqmdlo.mongodb.net/online-shop';

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session);

const app = express();

app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))
app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb+srv://hussein:python1221@cluster0.3tqmdlo.mongodb.net/online-shop',
    collection: 'session'
})

app.use(session({
    secret: "this is my secrete text for authentication",
    saveUninitialized: false,
    store: STORE
}))

app.set('view engine', 'ejs')

app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter)

app.get('/err', (req,res) => {
    res.status(500)
    res.render('error',{
        isUser: req.session.userId,
        pageTitle: 'Error',
        isAdmin: req.session.isAdmin
    })
})


app.get('/not-admin', (req,res) => {
    res.status(403)
    res.render('notAdmin',{
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "Error"
    })
})

app.use((err, req, res, next) => {
    res.redirect('/err')
})


app.listen(3000, () => console.log('server listen at port 3000'))