const User = require('../../models/User')

module.exports = {
  Mutation:{
    register(
      parent, 
      {
        registerInput: { username, password, confirmPassword, email }
      }, 
      context, 
      info
    ){
      // Validate User Input


      // Check if the Username isn't already taken


      // Hash password and generate an Auth Token
    }
  }
}