const {CustomAPIError} = require('../errors')
const {statusCodes} = require('http-status-codes')
const { StatusCodes } = require('http-status-codes/build/cjs/status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware