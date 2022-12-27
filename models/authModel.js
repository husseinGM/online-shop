const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');
const bcrypt = require('bcrypt');
const dbURL = '';

const userSchema = mogoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})
const User =  mogoose.model('user', userSchema);

const createNewUser = (username, email, password) => {
   return new Promise((resolve, reject) => {
    mongoose.connect(dbURL).then(() => {
        User.findOne({email})
    }).then(user => {
        if(user){
            reject('email is used')
        }else{
            return bcrypt.hash(password, 10)
        }
    }).then(hashedPassword => {
        let user = new User({username, email, password: hashedPassword, isAdmin: false });
        return user.save()
    }).then(() => {
        mogoose.disconnect()
        resolve()
    }).catch(err => {
        mogoose.disconnect()
        reject(err)
    })
   })
}

const Login = (email, password) => {
    return new Promise((resolve, reject) => {
        mogoose.connect(dbURL)
        .then(() => User.findOne({email: email}))
        .then(user => {
            if(!user){
                mogoose.disconnect()
                reject('there is no user with this email')
            }else{
                bcrypt.compare(password, user.password).then(same => {
                    if(!same){
                        mogoose.disconnect()
                        reject('in correct password')
                    }else{
                        mogoose.disconnect()
                        resolve({id: user._id, isAdmin: user.isAdmin})
                    }
                })
                console.log(user)
            }
        }).catch(err => {
            mogoose.disconnect()
            reject(err)
        })
    })
}
const findByEmail = (id) => {
    return new Promise((resolve, reject) => {
        mogoose.connect(dbURL).then(() => {
            return User.findById({_id: id})
        }).then(users => {
            console.log(users);
            mogoose.disconnect()
            resolve(users);
        }).catch(err => {
            reject(err)
        })
    })
}
module.exports = {
    createNewUser,
    Login,
    findByEmail
} 