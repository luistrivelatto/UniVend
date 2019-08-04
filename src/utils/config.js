import * as firebase from "firebase/app";

export default async function initialize() {
  firebase.initializeApp({
      apiKey: "AIzaSyCQwUT9B8Q9PAOpVH6YDJ1yP9GUcfrz9NU",
      authDomain: "univende-a2028.firebaseapp.com",
      databaseURL: "https://univende-a2028.firebaseio.com",
      projectId: "univende-a2028",
      storageBucket: "",
      messagingSenderId: "218906903133",
      appId: "1:218906903133:web:be0c3305b0ab9d86"
  });
}
