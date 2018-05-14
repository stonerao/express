const INSERT = (Objects) => {
    if (typeof Objects !== 'object' || Array.isArray(Objects)) {
        return false;
    }
    const keys = Object.keys(Objects).join(",");
    var str = '';
    Object.values(Objects).forEach(x => {
        str += `,'${x}'`;
    });;
    str = str.slice(1)
    return `INSERT INTO member (${keys}) VALUES (${str});`
}
module.exports = {
    INSERT: INSERT
}