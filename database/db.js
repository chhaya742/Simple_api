require("dotenv").config();
const knex=require("knex")({
    client:"mysql",
    connection:{
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    }
});


knex.schema.hasTable('userData').then(function(exists) {
    if (!exists) {
        return knex.schema.createTable("userData",(t)=>{
            t.increments("id")
            t.string("user_email").notNullable().unique();
            t.string("password").notNullable();
        })
    }
});
module.exports=knex