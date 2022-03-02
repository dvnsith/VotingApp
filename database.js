const firebaseConfig = {
    apiKey: "AIzaSyCse9S95oANTpGZ6d7EVOjW1J3xj5Pu3Gc",
    authDomain: "voting-a455d.firebaseapp.com",
    databaseURL: "https://voting-a455d-default-rtdb.firebaseio.com",
    projectId: "voting-a455d",
    storageBucket: "voting-a455d.appspot.com",
    messagingSenderId: "58482124083",
    appId: "1:58482124083:web:1f8cf091b3f915ce404a46",
    measurementId: "G-V0CNKJ7S03"
};

firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();
dbRef
  .child("foodPhotos")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
