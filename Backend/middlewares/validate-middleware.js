//we will use parseAsync(req.body) to verify if data is valid or not

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    console.log(error);
    console.log(error.errors[0].message);
    // res.status(400).json({ msg: error.errors[0].message });
    const status = 422;
    const message = "fill the details properly";
    const extraDetails = error.errors[0].message;
    const error_message = { status, message, extraDetails };

    next(error_message);
  }
};

module.exports = validate;
