let userData = require('./userData.json');

module.exports = {
    getUser: (req, res) => {
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
        let i = userData.findIndex((user) => +user.id === +userId)
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
        userData.map((user, i) => {
            if (+req.params.userId === +user.id) {
                user = { ...userData, user }
                return user
            }
            return user
        })

        return res.status(200).send(userData)
    },
    addUser: (req, res) => {
        let idCount = 0;
        for(let i = 0; i > userData.length; i++) {
            if (userData[i].id > idCount) {
                idCount = userData[i].id 
            } else {
                 idCount++
                let user = req.body
                user.id = idCount
                userData.push(user)
            }
        }

        res.status(200).send(userData)
    },
    deleteUser: (req, res) => {
        let id = req.params.userId;
        let i = userData.findIndex((user) => +user.id === +id)
        if (i !== -1) {
            userData.splice(i, 1)
        }
        res.status(200).send(userData)
    }
}