var mongoose = require("mongoose");
var schema = mongoose.Schema;
// coonnection manager
var connection = mongoose.connection;
connection.on("connected", function () {
    console.log("db connected");
});

// mongoose schema for user
var JobSchema = new schema({
    date: {
        type: Date,
        default: Date.now,
    },
    jobFetched:{}


});





// adminSchema.plugin(passportLocalMongoose);

const Job = mongoose.model("Job", JobSchema);

module.exports.Job = Job
