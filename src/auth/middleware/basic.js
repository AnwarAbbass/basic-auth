const bcrypt = require('bcrypt');
const base64 = require('base-64');
// db model
const User = require('../models/users-model');//model

async function signin(req, res, next) {
    try {
        let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
        let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
        let decodedString = base64.decode(encodedString); // "username:password"
        let [username, password] = decodedString.split(':'); // username, password

        const user = await User.findOne({ username: username });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            req.user = user;
            next();
        }
        else {
            throw new Error('not valid');
        }
    } catch (error) {
        error.statusCode = 403;
        next(error);
    }

}
module.exports = signin;