import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  doc,
  setDoc
} from "./firebase.js";

// INPUTS
const email = document.getElementById("email");
const password = document.getElementById("password");

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

const message = document.getElementById("message");

const terms = document.getElementById("terms");

// ===============================
// SIGN UP
// ===============================

signupBtn.addEventListener("click", async () => {

  // CHECK TERMS
  if (!terms.checked) {

    message.innerText =
      "Please agree to Terms & Agreement.";

    return;
  }

  // CHECK EMPTY FIELDS
  if (
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {

    message.innerText =
      "Please fill in all fields.";

    return;
  }

  try {

    // CREATE ACCOUNT
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value.trim()
      );

    const user = userCredential.user;

    // SEND VERIFICATION EMAIL
    await sendEmailVerification(user);

    // SAVE USER DATA
    await setDoc(doc(db, "users", user.uid), {

      email: user.email,
      verified: false,
      createdAt: new Date()

    });

    message.innerText =
      "Account created! Check your Gmail for verification link.";

  } catch (error) {

    console.log(error);

    // FRIENDLY ERRORS
    if (
      error.code === "auth/email-already-in-use"
    ) {

      message.innerText =
        "Email already registered.";

    } else if (
      error.code === "auth/invalid-email"
    ) {

      message.innerText =
        "Invalid email.";

    } else if (
      error.code === "auth/weak-password"
    ) {

      message.innerText =
        "Password must be at least 6 characters.";

    } else {

      message.innerText = error.message;

    }

  }

});

// ===============================
// LOGIN
// ===============================

loginBtn.addEventListener("click", async () => {

  // CHECK EMPTY FIELDS
  if (
    email.value.trim() === "" ||
    password.value.trim() === ""
  ) {

    message.innerText =
      "Please fill in all fields.";

    return;
  }

  try {

    // LOGIN
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email.value.trim(),
        password.value.trim()
      );

    const user = userCredential.user;

    // RELOAD USER
    await user.reload();

    // CHECK EMAIL VERIFICATION
    if (!user.emailVerified) {

      message.innerText =
        "Please verify your email first.";

      return;
    }

    message.innerText =
      "Login successful!";

    // REDIRECT
    setTimeout(() => {

      window.location.href =
        "dashboard.html";

    }, 1000);

  } catch (error) {

    console.log(error);

    // FRIENDLY ERRORS
    if (
      error.code === "auth/user-not-found"
    ) {

      message.innerText =
        "No account found.";

    } else if (
      error.code === "auth/wrong-password"
    ) {

      message.innerText =
        "Wrong password.";

    } else if (
      error.code === "auth/invalid-credential"
    ) {

      message.innerText =
        "Invalid email or password.";

    } else {

      message.innerText =
        error.message;

    }

  }

});