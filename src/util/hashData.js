const bcrypt = require("bcrypt");
// pass normal data it will hash that 
const hashData = async(data,saltRounds = 10)=>{
    try {
        const hashData = await bcrypt.hash(data,saltRounds);
        return hashData;
    } catch (error) {
        throw error;
    }
};
//pass unhased and hased data it will return if same or different
const verifyHashedData = async (unhashed,hashed)=>{
    try {
        const match = await bcrypt.compare(unhashed,hashed);
        return match;
    } catch (error) {
        throw error;
    }
};

module.exports = {hashData, verifyHashedData};