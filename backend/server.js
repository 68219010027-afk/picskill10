const express = require('express');


const app =express();
app.use = express();

app.get('/api/auth', (req, res) => {
    let user = {
        fristname: 'test',
    }
    res.json(user)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API พร้อมที่ http://localhost:' + PORT));