const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const validatorLoginResturant=(data)=>{
    const schema=Joi.object({
        adminUsername:Joi.string().required(),
        adminPassword:Joi.string().required()
    })
    return schema.validate(data)
}

module.exports={
    validatorLoginResturant
}