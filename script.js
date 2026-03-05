const form = document.getElementById("signUpForm");

const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const closePopupButton = document.getElementById("closePopup");

// Close popup on button click
closePopupButton.addEventListener("click", () => {
  popup.classList.remove("show");
});

// Get password input elements
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");

// Function to check password match
function checkPasswordMatch() {
  if (
    confirmPasswordInput.value &&
    passwordInput.value !== confirmPasswordInput.value
  ) {
    passwordInput.classList.add("error");
    confirmPasswordInput.classList.add("error");
    return false;
  } else {
    passwordInput.classList.remove("error");
    confirmPasswordInput.classList.remove("error");
    return true;
  }
}

// Listen for input events on both password fields
passwordInput.addEventListener("input", checkPasswordMatch);
confirmPasswordInput.addEventListener("input", checkPasswordMatch);

// Form submit listener
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Only proceed if passwords match
  if (!checkPasswordMatch()) {
    alert("Passwords don't match! Fix the fields to continue.");
    return;
  }

  // Collect form data
  const formData = new FormData(form);
  const data = {
    firstName: formData.get("first_name"),
    lastName: formData.get("last_name"),
    email: formData.get("email"),
    phone: formData.get("phone_number"),
    password: formData.get("password"),
  };

  // Fill popup content
  popupContent.innerHTML = `
    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
    <p><strong>Password:</strong> ${"*".repeat(data.password.length)}</p>
  `;

  // Show popup
  popup.classList.add("show");

  // Clear form
  form.reset();
});
