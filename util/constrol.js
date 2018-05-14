module.exports = {
    isObject: Object => {
        if (typeof Objects !== 'object' || Array.isArray(Objects)) {
            return false;
        }
        return true; 
    }
}