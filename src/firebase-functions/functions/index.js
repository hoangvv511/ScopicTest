const functions = require("firebase-functions");
const _ = require("lodash");

const formatItemText = (item) => {
  return _.upperFirst(item.replace(/\s+/g, " ").trim());
};

// Implement cloud functions to update list item

exports.listenOnItemUpdate = functions.firestore
  .document("/Users/{documentId}")
  .onWrite((snapshot, context) => {
    const isDocExist = snapshot.after.exists;
    const docData = isDocExist ? snapshot.after.data().notes : [];
    let newDocData = [...docData.map((x) => formatItemText(x))];

    return snapshot.after.ref.set({ notes: newDocData });
  });
