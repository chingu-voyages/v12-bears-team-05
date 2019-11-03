const { Joi } = require("celebrate");

module.exports = {
  user: {
    register: {
      body: Joi.object({
        name: Joi.string()
          .min(6)
          .required(),
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .required()
      })
    },
    login: {
      body: Joi.object({
        email: Joi.string()
          .min(6)
          .required()
          .email(),
        password: Joi.string()
          .min(6)
          .required()
      })
    },
    profile: {
      headers: Joi.object({
        "auth-token": Joi.string().required()
      })
    }
  },
  recipe: {
    create: {
      body: Joi.object({
        name: Joi.string()
          .alphanum()
          .required(),
        description: Joi.string()
          .alphanum()
          .required(),
        servings: Joi.number(),
        serving_amount: Joi.number(),
        prep_time: Joi.object({
          hours: Joi.string()
            .min(0)
            .max(24),
          minutes: Joi.string()
            .min(0)
            .max(60)
        }),
        cook_time: Joi.ref("prep_time"),
        instructions: Joi.array().items(Joi.string()),
        notes: Joi.string(),
        ingredients: Joi.array().items(
          Joi.object({
            name: Joi.string(),
            description: Joi.string(),
            amount: Joi.string()
          })
        ),
        tags: Joi.array(),
        images: Joi.array().items(Joi.string().uri()),
        privacy: Joi.string().valid(...["public", "private", "friends"])
      })
    }
  }
};
