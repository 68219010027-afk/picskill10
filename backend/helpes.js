function ok(res, data = null, message = 'สำเร็จ') {
    res.json({ status: 'success', message, data });
}

function error(res, code, message) {
    res.status(code).json({ status: 'error', message, data: null });
}

module.exports = { ok, error };