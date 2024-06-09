// this is a centralized error handler
// whenever the catch block receives an error, it is sent here
// from here, we can send the response to frontend

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const extraDetails = err.extraDetails || "Error from Backend";
  return res.status(status).json({
    message,
    extraDetails,
  });
};

module.exports = errorMiddleware;
