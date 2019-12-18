module.exports = {
    
    parseError: (err) => {
        if (!err.errors) return null;
        const errList = Object.entries(err.errors).map((i) => [i[0],[i[1].kind]]);
        return errList;
    }
}