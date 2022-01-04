const functions = require('firebase-functions');
const {formatTextItem} = require('helpers');
const _ = require('lodash');

// Implement cloud functions to update list item

exports.listenOnItemUpdate = functions.firestore
  .document('/Users/{documentId}')
  .onWrite((snapshot, context) => {
    const isDocExist = snapshot.after.exists;
    const docData = isDocExist ? snapshot.after.data().notes : [];
    let newDocData = [...docData.map(x => formatTextItem(x))];

    return snapshot.after.ref.set({notes: newDocData});
  });
