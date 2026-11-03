const fs = require('node:fs');
const bcrypt = require('bcryptjs');
const { qurey, query } = require('./db');

async function seed() {
    const sql = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
    for (const command of sql.split(';')) {
        if (command.trim()) await query(command);
    }

    // 2) ผู้ใช้ตัวอย่าง
    const users = [
        ['admin', 'admin1234', 'ฝ่ายบุคลากร', 'admin', 0],
        ['emp1', 'emp12345', 'สมชาย ใจดี', 'evaluatee', 1],
        ['emp2', 'emp12345', 'สมหญิง ตั้งใจ', 'evaluatee', 1],
        ['eva1', 'eva12345', 'ประธาน กรรมการ', 'evaluator', 1],
        ['eva2', 'eva12345', 'กรรมการ ร่วม', 'evaluator', 1],
    ];
    for (const [username, password, name, role, mustChange ] of users) {
        const hash = await bcrypt.hash(password, 10);
        await query(
            'INSERT IGNORE INTO users(username, password, full_name, role, must_change_password) VALUES (?, ?, ?, ?, ?)',
            [username, hash, name, role, mustChange],
    );
 }

 console.log('seed สำเร็จแล้ว');
 process.exit(0);
}

seed().catch((err) => {
    console.error('seed ไม่สำเร็จ' , err);
    process.exit(1);
})

