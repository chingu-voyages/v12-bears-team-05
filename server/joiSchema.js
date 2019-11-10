const { Joi } = require("celebrate");

module.exports = {
  user: {
    register: {
      body: Joi.object({
        name: Joi.string()
          .min(2)
          .required(),
        email: Joi.string()
          .min(3)
          .required()
          .email(),
        password: Joi.string()
          .regex(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          )
          .required()
      })
    },
    login: {
      body: Joi.object({
        email: Joi.string()
          .min(3)
          .required()
          .email(),
        password: Joi.string().required()
      })
    },
    profile: {
      headers: Joi.object({
        "auth-token": Joi.string().required()
      }).unknow(true)
    }
  },
  recipe: {
    create: {
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        servings: Joi.number(),
        serving_amount: Joi.number(),
        prep_time: Joi.object({
          hours: Joi.number()
            .default(0)
            .min(0)
            .max(24),
          minutes: Joi.number()
            .default(0)
            .min(0)
            .max(60)
        }),
        cook_time: Joi.object({
          hours: Joi.number()
            .default(0)
            .min(0)
            .max(24),
          minutes: Joi.number()
            .default(0)
            .min(0)
            .max(60)
        }),
        instructions: Joi.array()
          .items(Joi.string())
          .required(),
        notes: Joi.string(),
        ingredients: Joi.array()
          .items(
            Joi.object({
              name: Joi.string(),
              description: Joi.string(),
              amount: Joi.string()
            })
          )
          .required(),
        tags: Joi.array().items(Joi.string()),
        images: Joi.array().items(Joi.string().uri()),
        privacy: Joi.string().valid(...["public", "private", "friends"])
      }).required()
      // .message("Payload is empty or invalid payload")
    }
  }
};
