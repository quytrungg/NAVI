import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const USER_STATE_CHANGE = "USER_STATE_CHANGE";

export function fetchUser(loaded) {
  var userDocument;
  firebase
    .firestore()
    .collection("user")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        userDocument = snapshot.data().name;
        console.log("1");
        console.log(userDocument);
        console.log("2");
      } else {
        console.log("does not exist");
      }
    });
  loaded = true;
  console.log(1);
  return userDocument;
}
