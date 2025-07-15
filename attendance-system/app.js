const firebaseConfig = {
  apiKey: "AIzaSyBC2ebGmQXZ542Fr41U4fiNnGVV1I3dER8",
  authDomain: "attendence-system-c0ccf.firebaseapp.com",
  databaseURL: "https://attendence-system-c0ccf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "attendence-system-c0ccf",
  storageBucket: "attendence-system-c0ccf.firebasestorage.app",
  messagingSenderId: "950197956581",
  appId: "1:950197956581:web:1e58ea673b1a9d9ae4c90c",
  measurementId: "G-HSQ2RZENTF"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const messageEl = document.getElementById('message');

// Present handler
document.getElementById('attendanceForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;

  firebase.database().ref('attendance/' + roll).set({
    name: name,
    roll: roll,
    status: "Present",
    time: new Date().toLocaleString()
  });

  messageEl.innerText = `✓ Marked Present for ${name}`;
  messageEl.style.color = "black";
});

// Absent handler
document.getElementById('absentBtn').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;

  if (!name || !roll) {
    messageEl.innerText = "⚠️ Please enter both name and roll number.";
    messageEl.style.color = "orange";
    return;
  }

  firebase.database().ref('attendance/' + roll).set({
    name: name,
    roll: roll,
    status: "Absent",
    time: new Date().toLocaleString()
  });

  messageEl.innerText = `× Marked Absent for ${name}`;
  messageEl.style.color = "black";
});