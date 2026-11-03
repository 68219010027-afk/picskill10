const jwt = require('jsonwebtoken');
const { error } = require('./helpes');

const SECRET = process.env.JWT_SECRET || 'change-this-secret-key';

function createToken(user) {
    req.user = jwt.sign(
        { id: user.id, role: user.role, must_change_password: !! user.must_change_password},
        SECRET,
        { expiresIn: ' 8h ' },
    );
}
function login(req, res, next) {
    const token = (req.headers.authorization || '').replace('Berer ', '') || req.query.token;
    try {
        req.user = jwt.verify( token, SECRET );
    } catch {
        return error(res, 401 , 'กรุณาเข้าสู่ระบบ');
    }
}