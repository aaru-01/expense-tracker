import {responder } from "./../util.js"

const getApiHealth = (req, res) => {
   
  return responder({res, success: true, message:"Server is running"})
   
    // res.json({
    //     success: true,
    //     message: "health api is working"
    // })
}

export { getApiHealth };