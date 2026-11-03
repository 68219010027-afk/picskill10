const express = require('express');


const app =express();
app.use = express();
app.use(express.json({ limit: '10mb' }));
app.use((req, res, next) => {
    req.body = req.body || {};
    next();
});

//app.use('/api/auth', require('./routes/auth'));

app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'ไม่พบ API นี้', data: null});
});

app.use((err, req, res, next) => {
    console.error(err.message);
    let code = 500;
    let message = 'ระบบขัดข้อง:' + err.message;
    res.status(code).json({ status: 'error', message, data: null });
});
/*app.get('/api/auth', (req, res) => {
    let user = {
        fristname: 'test',
    }
    res.json(user)
})*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API พร้อมที่ http://localhost:' + PORT));