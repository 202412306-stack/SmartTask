import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  doc,
  setDoc
} from "./firebase.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

// SIGN UP
document.getElementById("signupBtn").onclick = async () => {

  try {

    const userCred =
      await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

    const user = userCred.user;

    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
      email: user.email
    });

    msg.innerText =
      "Check email for verification";

  } catch (e) {
    msg.innerText = e.message;
  }

};

// LOGIN
document.getElementById("loginBtn").onclick = async () => {

  try {

    const userCred =
      await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

    const user = userCred.user;

    await user.reload();

    if (!user.emailVerified) {
      msg.innerText =
        "Verify email first";
      return;
    }

    window.location.href =
      "dashboard.html";

  } catch (e) {
    msg.innerText = e.message;
  }

};

// OPEN MODAL
document.getElementById("openTerms").onclick = () => {
  document.getElementById("termsModal").style.display = "flex";
};

// CLOSE MODAL
document.getElementById("closeTerms").onclick = () => {
  document.getElementById("termsModal").style.display = "none";
};

// CLICK OUTSIDE MODAL TO CLOSE
window.onclick = (e) => {
  const modal = document.getElementById("termsModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};