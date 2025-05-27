const firebaseConfig = {
  apiKey: "AIzaSyCh8pdE_49GoA6uLb307k7P1PYtXPfSGxY",
  authDomain: "project-7017618223638008761.firebaseapp.com",
  databaseURL: "https://project-7017618223638008761-default-rtdb.firebaseio.com",
  projectId: "project-7017618223638008761",
  storageBucket: "project-7017618223638008761.appspot.com",
  messagingSenderId: "561151732600",
  appId: "1:561151732600:web:cbf0659eebae97ee1c768d"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let quoteList = [];
let currentIndex = 0;

// 從 Firebase 載入所有語錄
db.ref("quotes").on("value", snapshot => {
  const data = snapshot.val();
  quoteList = Object.values(data || {});
  currentIndex = 0;
  showQuote();
});

function showQuote() {
  if (quoteList.length === 0) {
    document.getElementById("english").innerText = "目前沒有語錄，請先新增一筆！";
    document.getElementById("chinese").innerText = "";
    return;
  }
  const q = quoteList[currentIndex % quoteList.length];
  document.getElementById("english").innerText = q.en;
  document.getElementById("chinese").innerText = q.ch;
  document.getElementById("chinese").style.display = "none";
}

function showTranslation() {
  document.getElementById("chinese").style.display = "block";
}

function nextQuote() {
  currentIndex++;
  showQuote();
}

function addQuote() {
  const en = document.getElementById("new-en").value;
  const ch = document.getElementById("new-ch").value;
  if (!en || !ch) {
    alert("請輸入英文與中文翻譯！");
    return;
  }
  db.ref("quotes").push({ en, ch });
  alert("語錄新增成功！");
  document.getElementById("new-en").value = "";
  document.getElementById("new-ch").value = "";
}
