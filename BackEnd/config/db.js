const mongoose= require('mongoose');
const colors= require('colors');

const connectDB= async() =>{
main()
.then( ()=> {
    console.log(`MongoDB DataBase Connection successful ${mongoose.connection.host}`.bgMagenta.white);
})
.catch( (err)=> {
    console.log(`MongoDB connection error ${err}`.bgRed.white);
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}
}

module.exports= connectDB;