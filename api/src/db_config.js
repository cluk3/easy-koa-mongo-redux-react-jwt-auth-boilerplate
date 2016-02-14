import mongoose from 'mongoose';
import config from '../../config';


export default function dbConfig() {

  const dbURL = config.mongo.url + " DB!";

  mongoose.connect(config.mongo.url, function(ref) {
    console.log("  --> Connected to " + dbURL);
  });
  mongoose.connection.on("error", function(err) {
    console.log(err);
  });

  if (config.app.env !== "production") {

    mongoose.connection.on("close", function() {
      console.log("  --> Disconnected from " + dbURL);
    });

    mongoose.connection.on("reconnected", function() {
      console.log("  --> Reconnected to " + dbURL);
    });

    mongoose.connection.on("disconnected", function() {
      console.log("  --> Disconnected from "+ dbURL);
    });
  }

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('  --> Disconnected from ' + config.mongo.url + ' through app termination');
      process.exit(0);
    });
  });

}
