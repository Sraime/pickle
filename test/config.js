const env = process.env.NODE_ENV || 'test'; 

const test = {
    mongodb: {
        host: 'localhost',
        port: 27017,
        db: 'pickle_test'
    },
    front: {
        url: "http://localhost:4201"
    },
    back: {
        url: "http://localhost:3001"
    }
}

const config = {
    test
};
module.exports = config[env];