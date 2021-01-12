const { check, validationResult, body } = require("express-validator");

exports.validateRegisterUser = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("email", "Please enter valid email.").isEmail(),
  check("country", "Country is required").not().isEmpty(),
  check("area", "Area is required").not().isEmpty(),
  check("address", "Adress is required.").not().isEmpty(),
  check("phone", "Phone number is required").not().isEmpty(),
  check("postalCode", "Postal code is required").not().isEmpty(),
  check("password", "Need password with 6 or more characters.").isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateUser = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("email", "Please enter valid email.").isEmail(),
  check("country", "Country is required").not().isEmpty(),
  check("area", "Area is required").not().isEmpty(),
  check("address", "Adress is required.").not().isEmpty(),
  check("phone", "Phone number is required").not().isEmpty(),
  check("postalCode", "Postal code is required").not().isEmpty(),
  check("password", "Need password with 6 or more characters.").isLength({
    min: 6,
  }),
  check("category").optional(),
  check("company")
    .optional()
    .if(({ req }) => req.body.isSeller === true)
    .not()
    .isEmpty()
    .withMessage("Company is required for sellers")
    .if(({ req }) => req.body.country !== "LK")
    .withMessage("Country should be Sri Lanka."),

  async (req, res, next) => {
    if (Boolean(req.body.isSeller) == true) {
      await body("country")
        .equals("LK")
        .withMessage("Country should be Sri Lanka for sellers.")
        .run(req);
      await body("category")
        .not()
        .isEmpty()
        .withMessage("Category is required for sellers")
        .run(req);
      await body("company")
        .not()
        .isEmpty()
        .withMessage("Company is required for sellers")
        .run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
