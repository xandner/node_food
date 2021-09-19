const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const foodValidator = (data)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
        description:Joi.string().required(),

    })
    return schema.validate(data)
}

module.exports={
    foodValidator
}
