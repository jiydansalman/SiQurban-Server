//Logic check
const getStatus = (req, res) => {
    try {res.status(200).json({
        status: 'Success',
        message: 'Server berjalan dengan baik 🚀',
        timestamp: new Date().toISOString()
        });
    } catch (error){
        res.status(500).json({
            status: 'Error',
            message: 'Terjadi kesalahan pada server',
        });
    }
};

module.exports = { getStatus };

