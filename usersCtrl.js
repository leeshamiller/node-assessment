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
        // the ternary here is not really necessary, as the === resolves into true and false already
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
        // Here you should just overwrite userData with userData.
        let updatedUserData = userData.map((user, i) => {
            if (+req.params.userId === +user.id) {
                // you may want to try using the spread operator here to save you a lot of typing
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
                    // this would actualy create an array of one item, that one item being an array, again, spread operator could be good here but really just dropping the brackets would be best
                    favorites: [req.body.favorites]
                }
                // this line is is not the best idea. you are removing the item from the array mid loop, then insert it back in.
                // I also ends up not being needed, because you return the user on the next line and take advantage of the feature of the map.
                userData.splice(i, 1, user)
                // this is not needed because you do a return on the next line anyway
                return user
            }
            return user
        })
        return res.status(200).send(updatedUserData)
    },
    addUser: (req, res) => {
        // the ++ operator modifies the value you are using it on. so this would modify the property length, but the actual length would not reflect it.
        // It is also not a good idea to base the index off the length of the array. You don't have an easy way to ensure the id is not repead. better to have an id varaible to track the last used id and incrment that.
        let id = userData.length++;
        let user = req.body
        user.id = id
        userData.push(user)
        console.log(user)
        res.status(200).send(userData)
    },
    deleteUser: (req, res) => {
        let id = req.params.userId;
        //same thing about the ternary
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
