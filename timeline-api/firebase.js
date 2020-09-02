var admin = require("firebase-admin");

var serviceAccount = require("./beyond-timeline-d9c3d-firebase-adminsdk-mbaff-468d034360.json");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beyond-timeline-d9c3d.firebaseio.com"
});

module.exports = {
    firestore: admin.firestore(app)
}