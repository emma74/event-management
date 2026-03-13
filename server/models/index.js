import { Sequelize } from "sequelize";
import config from "../config/config.js";

import userModel from './user.js'
import eventModel from './event.js'
import attendeeModel from "./attendee.js";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  
  {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging
  }
);

  //Create empty object to hold or database models and Sequalize instance
  const db = {};

  //store the Sequalize library and the database connection instance in our db object
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  //initialize models
  //initialize each model by passing the sequalize connection object
  //This step links our model definitions to the actaul database
  db.User = userModel(sequelize, Sequelize);
  db.Event = eventModel(sequelize, Sequelize);
  db.Attendee = attendeeModel(sequelize, Sequelize);

  //define relationships
  //define the relationships between the models
  //these associations are important for creating a relational structure in the database

  //a user can have many Events *one-to-many relationship)
  //he 'as' alias ('events') helps in querying and foreignKey defines the link
  db.User.hasMany(db.Event, { as: 'events', foreignKey: 'userId' });
  db.User.hasMany(db.Attendee, { as: 'rsvps', foreignKey: 'userId' });

  db.Event.hasMany(db.Attendee, { as: 'attendees', foreignKey: 'eventId' });
  db.Event.belongsTo(db.User, { as: 'creator', foreignKey: 'userId' });

  db.Attendee.belongsTo(db.User, { as: 'user', foreignKey: 'userId' });
  db.Attendee.belongsTo(db.User, { as: 'event', foreignKey: 'eventId' });

export default db;