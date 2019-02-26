const userData = require('./userData.json');

module.exports = {
    getUser: (req, res) => {
        // console.log(req.query)
        if (req.query.age) {
            let lessThanAge = userData.filter(user => user.age < req.query.age)
            res.status(200).send(lessThanAge)
        }
        else if (req.query.email) {
            let email = userData.filter(user => user.email.includes(req.query.email))
            res.status(200).send(email)
        }
        else if (req.query.favorites) {
            let favs = userData.filter(user => user.favorites.includes(req.query.favorites))
            res.status(200).send(favs)
        } else {
            res.status(200).send(userData)
        }
    },
    getUserId: (req, res) => {
        let { userId } = req.params
        let i = userData.findIndex((user) => +user.id === +userId ? true : false)
        if (i !== -1 && +userId === +userData[i].id) {
            res.status(200).send(userData[i])
        } else {
            res.sendStatus(404)
        }
        
    },
    getAdmin: (req, res) => {
        let admin = userData.filter(user => user.type === 'admin')
        res.status(200).send(admin)
    },
    getNonAdmin: (req, res) => {
        let nonAdmin = userData.filter(user => user.type !== 'admin')
        res.status(200).send(nonAdmin)
    },
    getUserType: (req, res) => {
        let userType = req.params
        let userTypeArr = userData.filter(user => user.type === userType.userType)
        res.status(200).send(userTypeArr)
    },
    updateUserId: (req, res) => {
        // console.log(req.params.userId)
        let updatedUserData = userData.map((user, i) => {
            if (+req.params.userId === +user.id) {
                user = {
                    id: +req.params.userId,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    gender: req.body.gender,
                    language: req.body.language,
                    age: req.body.age,
                    city: req.body.city,
                    state: req.body.state,
                    type: req.body.type,
                    favorites: [req.body.favorites]
                }
                userData.splice(i, 1, user)
                return user
            }
            return user
        })
        return res.status(200).send(updatedUserData)
    },
    addUser: (req, res) => {
        let id = userData.length++;
        let user = req.body
        user.id = id
        userData.push(user)
        console.log(user)
        res.status(200).send(userData)
    },
    deleteUser: (req, res) => {
        let id = req.params.userId;
        let i = userData.findIndex((user) => +user.id === +id ? true : false)
        // console.log(userData.length)
        if (i !== -1) {
            userData.splice(i, 1)
        }
        // console.log(id, i)
        // console.log(userData.length)
        res.status(200).send(userData)
    }
}