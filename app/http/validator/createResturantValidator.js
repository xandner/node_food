const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validatorCreateResturant=(data)=>{
    const schema=Joi.object({
        name:Joi.string().required(),
        description:Joi.string().required(),
        addresse:Joi.string().required(),
        adminUsername:Joi.string().required(),
        adminPassword:Joi.string().required()
    })
    return schema.validate(data)
}

module.exports={
    validatorCreateResturant
}