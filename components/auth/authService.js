const {models} = require('../../models');
const bcrypt = require('bcrypt'); 

exports.register = async(username, password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return models.customer.create({
        username: username,
        password: hashPassword
    });
}