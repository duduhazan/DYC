import Joi from "joi";

export default function validateCard(card) {
  const schemaOfCard = Joi.object({
    name: Joi.string().required().min(3).max(255),
    type: Joi.string().required().min(3).max(255),
    address: Joi.string().required().min(3).max(255),
    phone: Joi.string().required().min(9).max(14),
    description: Joi.string().required().min(2).max(255),
    imageName: Joi.string().required(),
  });

  return schemaOfCard.validate(card);
}
