if(process.env.NODE_ENV == "production"){
  module.exports = {mongoURI: "mongodb+srv://admin:admin@project4.uxgsj2z.mongodb.net/"}
}else{
  module.exports = {mongoURI: 'mongodb+srv://admin:admin@project4.uxgsj2z.mongodb.net/'}
}


