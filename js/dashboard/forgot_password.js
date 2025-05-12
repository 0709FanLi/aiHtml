/**
 * Forgot Password functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to forgot password link
  const forgotPasswordLink = document.getElementById("forgot-password");
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", function (e) {
      e.preventDefault();
      showForgotPasswordModal();
    });
  }
});

/**
 * Shows the forgot password modal
 */
function showForgotPasswordModal() {
  // Check if modal already exists
  let forgotPasswordModal = document.getElementById("forgot-password-modal");

  if (!forgotPasswordModal) {
    // Create modal if it doesn't exist
    forgotPasswordModal = document.createElement("div");
    forgotPasswordModal.id = "forgot-password-modal";
    forgotPasswordModal.className = "modal fade";
    forgotPasswordModal.tabIndex = "-1";
    forgotPasswordModal.setAttribute(
      "aria-labelledby",
      "forgotPasswordModalLabel"
    );
    forgotPasswordModal.setAttribute("aria-hidden", "true");

    forgotPasswordModal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="forgotPasswordModalLabel">Reset Your Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted mb-3">Enter your email address and a verification code to reset your password.</p>
            <form id="reset-password-form" novalidate>
              <div class="mb-3">
                <label for="reset-email" class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="reset-email" 
                  placeholder="Enter your email"
                  oninvalid="this.setCustomValidity('Please enter a valid email address')"
                  oninput="this.setCustomValidity('')"
                  required
                />
                <div class="invalid-feedback" id="email-feedback">
                  Please enter a valid email address
                </div>
                <small class="form-text text-muted">Please use your registered email address</small>
              </div>
              
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label for="verification-code" class="form-label">Verification Code</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="verification-code" 
                    placeholder="Enter the 6-digit code"
                    required
                    maxlength="6"
                    pattern="[0-9]{6}"
                    oninvalid="this.setCustomValidity('Please enter a valid 6-digit code')"
                    oninput="this.setCustomValidity('')"
                  />
                  <div class="invalid-feedback">
                    Please enter a valid 6-digit code
                  </div>
                </div>
                <div class="col-md-4 mb-3 d-flex align-items-end">
                  <button type="button" class="btn btn-outline-primary w-100" id="send-code-button">
                    Get Code
                  </button>
                </div>
              </div>
              
              <div class="mb-3">
                <label for="new-reset-password" class="form-label">New Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="new-reset-password" 
                  placeholder="Min. 8 characters"
                  required
                  minlength="8"
                  oninvalid="this.setCustomValidity('Password must be at least 8 characters')"
                  oninput="this.setCustomValidity('')"
                />
                <div class="progress mt-2" style="height: 5px">
                  <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 0%"
                    id="reset-password-strength"
                  ></div>
                </div>
                <small class="text-muted" id="reset-password-feedback">
                  Password strength will be shown here
                </small>
              </div>
              
              <div class="mb-3">
                <label for="confirm-reset-password" class="form-label">Confirm New Password</label>
                <input 
                  type="password" 
                  class="form-control" 
                  id="confirm-reset-password" 
                  placeholder="Confirm your password"
                  required
                  oninvalid="this.setCustomValidity('Please confirm your password')"
                  oninput="this.setCustomValidity('')"
                />
                <div class="invalid-feedback">
                  Passwords must match
                </div>
              </div>
              
              <div class="alert alert-danger d-none" id="reset-password-error"></div>
              
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-check-circle me-2"></i> Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(forgotPasswordModal);
  }

  // Show the modal
  const bsModal = new bootstrap.Modal(forgotPasswordModal);
  bsModal.show();

  // Add form submit handler
  const resetForm = document.getElementById("reset-password-form");
  if (resetForm) {
    // Remove any existing listeners to prevent duplicates
    const newResetForm = resetForm.cloneNode(true);
    resetForm.parentNode.replaceChild(newResetForm, resetForm);
    newResetForm.addEventListener("submit", handlePasswordReset);
  }

  // Add password strength meter
  const newPasswordInput = document.getElementById("new-reset-password");
  if (newPasswordInput) {
    newPasswordInput.addEventListener("input", updatePasswordStrength);
  }

  // Add send code button handler
  const sendCodeButton = document.getElementById("send-code-button");
  if (sendCodeButton) {
    sendCodeButton.addEventListener("click", handleSendVerificationCode);
  }

  // After the modal is shown, set up error message handling
  bsModal.show();
  setupErrorMessageObserver();
}

/**
 * Handles sending verification code
 */
function handleSendVerificationCode() {
  const email = document.getElementById("reset-email").value;
  const errorElement = document.getElementById("reset-password-error");
  const button = document.getElementById("send-code-button");

  // Hide any previous errors
  errorElement.classList.add("d-none");

  // Simple email validation that works with QQ emails
  if (!email || !email.includes("@") || !email.includes(".")) {
    errorElement.textContent = "Please enter a valid email address";
    errorElement.classList.remove("d-none");
    return;
  }

  // Special handling for QQ emails
  if (email.endsWith("@qq.com") && /^\d+@qq\.com$/.test(email)) {
    // QQ email is valid, continue processing
  } else if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
    // For non-QQ emails, use standard validation
    errorElement.textContent = "Please enter a valid email address";
    errorElement.classList.remove("d-none");
    return;
  }

  // Update button to show loading state
  const originalText = button.textContent;
  button.disabled = true;
  button.innerHTML =
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

  // API call to request verification code
  fetch("http://web.practicesnow.com/api/v1/auth/send-verification-code", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then(({ isSuccess, data, status }) => {
      if (isSuccess) {
        // Show success message
        if (typeof showNotification === "function") {
          showNotification(
            "success",
            "Verification Code Sent",
            "Please check your email for the verification code"
          );
        }

        // Start countdown for resend button
        startResendCountdown(button);
      } else {
        let errorMessage = "Failed to send verification code";

        if (status === 404) {
          errorMessage = "Email address not found in our system";
        } else if (status === 429) {
          errorMessage = "Too many attempts. Please try again later";
        } else {
          errorMessage =
            data.message ||
            "Failed to send verification code. Please try again later";
        }

        errorElement.textContent = errorMessage;
        errorElement.classList.remove("d-none");

        // Reset button
        button.disabled = false;
        button.textContent = originalText;
      }
    })
    .catch((error) => {
      console.error("Verification code error:", error);
      errorElement.textContent =
        "Network error. Please check your connection and try again";
      errorElement.classList.remove("d-none");

      // Reset button
      button.disabled = false;
      button.textContent = originalText;
    });
}

/**
 * Start countdown for resend button
 * @param {Element} button - Button element to update
 */
function startResendCountdown(button) {
  let countdown = 60;
  button.disabled = true;

  const timer = setInterval(() => {
    button.textContent = `Resend (${countdown})`;
    countdown--;

    if (countdown < 0) {
      clearInterval(timer);
      button.disabled = false;
      button.textContent = "Get Code";
    }
  }, 1000);
}

/**
 * Updates the password strength indicator
 * @param {Event} e - Input event
 */
function updatePasswordStrength(e) {
  const password = e.target.value;
  const strength = calculatePasswordStrength(password);
  const progressBar = document.getElementById("reset-password-strength");
  const feedback = document.getElementById("reset-password-feedback");

  if (!progressBar || !feedback) return;

  // Update progress bar
  progressBar.style.width = `${strength.score * 25}%`;

  // Set appropriate color
  progressBar.className = "progress-bar";
  if (strength.score <= 1) {
    progressBar.classList.add("bg-danger");
  } else if (strength.score <= 2) {
    progressBar.classList.add("bg-warning");
  } else if (strength.score <= 3) {
    progressBar.classList.add("bg-info");
  } else {
    progressBar.classList.add("bg-success");
  }

  // Update feedback text
  feedback.textContent = strength.feedback;
}

/**
 * Calculates password strength
 * @param {string} password - Password to evaluate
 * @returns {{score: number, feedback: string}} Strength score and feedback
 */
function calculatePasswordStrength(password) {
  let score = 0;
  let feedback = "Password is too weak";

  if (!password) return { score, feedback };

  // Length check
  if (password.length >= 8) score++;

  // Complexity checks
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^A-Za-z0-9]/)) score++;

  // Set feedback
  if (score === 1) feedback = "Password is weak";
  else if (score === 2) feedback = "Password is moderate";
  else if (score === 3) feedback = "Password is strong";
  else if (score === 4) feedback = "Password is very strong";

  return { score, feedback };
}

/**
 * Handles the password reset form submission
 * @param {Event} e - Submit event
 */
function handlePasswordReset(e) {
  e.preventDefault();

  const email = document.getElementById("reset-email").value;
  const verificationCode = document.getElementById("verification-code").value;
  const newPassword = document.getElementById("new-reset-password").value;
  const confirmPassword = document.getElementById(
    "confirm-reset-password"
  ).value;
  const errorElement = document.getElementById("reset-password-error");

  // Hide any previous errors
  errorElement.classList.add("d-none");

  // Email validation using regex that allows qq.com and other valid domains
  // This regex specifically handles numeric-only usernames like in QQ emails (e.g., 385717000@qq.com)
  const emailRegex =
    /^\d+@qq\.com$|^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email || !emailRegex.test(email)) {
    errorElement.textContent = "Please enter a valid email address";
    errorElement.classList.remove("d-none");
    return;
  }

  // Validate verification code
  if (
    !verificationCode ||
    verificationCode.length !== 6 ||
    !/^\d{6}$/.test(verificationCode)
  ) {
    errorElement.textContent = "Please enter a valid 6-digit verification code";
    errorElement.classList.remove("d-none");
    return;
  }

  // Validate password
  if (!newPassword || newPassword.length < 8) {
    errorElement.textContent = "Password must be at least 8 characters long";
    errorElement.classList.remove("d-none");
    return;
  }

  // Calculate password strength
  const passwordStrength = calculatePasswordStrength(newPassword);
  if (passwordStrength.score < 3) {
    errorElement.textContent =
      "Please use a stronger password with a mix of uppercase letters, numbers, and special characters";
    errorElement.classList.remove("d-none");
    return;
  }

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    errorElement.textContent = "New password and confirmation do not match";
    errorElement.classList.remove("d-none");
    return;
  }

  // Get the form and submit button
  const form = e.target;
  const submitButton = form.querySelector("button[type='submit']");
  const originalText = submitButton.innerHTML;

  // Update button to show loading state
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Resetting...';

  // Prepare data
  const resetData = {
    email: email,
    verification_code: verificationCode,
    new_password: md5(newPassword),
    password_confirm: md5(confirmPassword),
  };

  // API call to reset password
  fetch("http://web.practicesnow.com/api/v1/auth/reset-password", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(resetData),
  })
    .then((response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then(({ isSuccess, data, status }) => {
      if (isSuccess) {
        // Hide modal
        const forgotPasswordModal = document.getElementById(
          "forgot-password-modal"
        );
        const modal = bootstrap.Modal.getInstance(forgotPasswordModal);
        modal.hide();

        // Show success message
        if (typeof showNotification === "function") {
          showNotification(
            "success",
            "Password Reset Complete",
            "Your password has been successfully reset. You can now log in with your new password."
          );
        } else {
          alert(
            "Your password has been successfully reset. You can now log in with your new password."
          );
        }

        // Reset form
        form.reset();
      } else {
        let errorMessage = "Failed to reset password";

        if (status === 400) {
          errorMessage = "Invalid verification code";
        } else if (status === 404) {
          errorMessage = "Email address not found";
        } else if (status === 422) {
          errorMessage = "Validation error. Please check all fields";
        } else {
          errorMessage =
            data.message || "Failed to reset password. Please try again later";
        }

        errorElement.textContent = errorMessage;
        errorElement.classList.remove("d-none");
      }
    })
    .catch((error) => {
      console.error("Password reset error:", error);
      errorElement.textContent =
        "Network error. Please check your connection and try again";
      errorElement.classList.remove("d-none");
    })
    .finally(() => {
      // Reset button
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    });
}

// Add internationalized error messages for email validation
function getEmailErrorMessage(email) {
  if (!email) {
    return "Please enter your email address";
  } else if (!email.includes("@")) {
    return "Please include an '@' in the email address";
  } else if (!email.includes(".")) {
    return "Please include a valid domain in the email address";
  } else if (email.endsWith("@qq.com") && !/^\d+@qq\.com$/.test(email)) {
    return "QQ email should contain only numbers before @qq.com";
  } else {
    return "Please enter a valid email address format";
  }
}

// Function to override any Chinese error messages with English ones
function overrideErrorMessagesWithEnglish() {
  // Find any displayed error elements
  const errorElements = document.querySelectorAll(".alert-danger:not(.d-none)");

  errorElements.forEach((element) => {
    const text = element.textContent;

    // Replace known Chinese error messages with English versions
    if (text.includes("请填写")) {
      element.textContent = "Please complete this field";
    } else if (text.includes("请在电子邮件")) {
      element.textContent = "Please include an '@' in the email address";
    } else if (text.includes("中包括")) {
      element.textContent = "Please enter a valid email address format";
    } else if (text.includes("密码")) {
      element.textContent = "Please enter a valid password";
    } else if (text.includes("字段")) {
      element.textContent = "Please complete all required fields";
    }
  });
}

// Add an observer to catch dynamically added error messages
function setupErrorMessageObserver() {
  // Create a mutation observer to look for any added or revealed error messages
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class" &&
        !mutation.target.classList.contains("d-none") &&
        mutation.target.classList.contains("alert-danger")
      ) {
        // If a hidden error message becomes visible, check if it's in Chinese
        overrideErrorMessagesWithEnglish();
      } else if (mutation.type === "childList") {
        // If new nodes are added, check if any are error messages
        overrideErrorMessagesWithEnglish();
      }
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  return observer;
}
