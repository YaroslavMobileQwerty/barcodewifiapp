import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    firebaseApiKey: process.env.apiKey,
    firebaseAuthDomain: process.env.authDomain,
    firebaseProjectId: process.env.projectId,
    firebaseStorageBucket: process.env.storageBucket,
    firebaseMessagingSenderId: process.env.messagingSenderId,
    firebaseAppId: process.env.appId,
    firebaseMeasurementId: process.env.measurementId,
  },
});
