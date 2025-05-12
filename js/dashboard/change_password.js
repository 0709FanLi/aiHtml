/**
 * Change Password functionality
 * Including form validation, MD5 encryption, and API calls
 */

document.addEventListener("DOMContentLoaded", function () {
  const passwordForm = document.getElementById("password-form");

  if (passwordForm) {
    // Password strength monitoring
    const newPasswordInput = document.getElementById("new-password");
    if (newPasswordInput) {
      newPasswordInput.addEventListener("input", updatePasswordStrength);
    }

    // Form submission listener
    passwordForm.addEventListener("submit", handlePasswordUpdate);
  }
});

/**
 * Handle password update
 * @param {Event} e - Form submission event
 */
function handlePasswordUpdate(e) {
  e.preventDefault();

  // Get form values
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Form validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    showNotification("error", "Form Error", "All password fields are required");
    return;
  }

  // Password length validation
  if (newPassword.length < 8) {
    showNotification(
      "error",
      "Invalid Password",
      "New password must be at least 8 characters"
    );
    return;
  }

  // Password complexity validation (at least one uppercase letter, one number, and one special character)
  const passwordStrength = calculatePasswordStrength(newPassword);
  if (passwordStrength.score < 3) {
    showNotification(
      "error",
      "Password Too Weak",
      "Please use a password with uppercase letters, numbers, and special characters"
    );
    return;
  }

  // New password and confirmation match validation
  if (newPassword !== confirmPassword) {
    showNotification(
      "error",
      "Password Mismatch",
      "New password and confirmation don't match"
    );
    return;
  }

  // Prepare submission data (using MD5 encryption for password)
  const passwordData = {
    current_password: md5(currentPassword),
    new_password: md5(newPassword),
    password_confirm: md5(confirmPassword),
  };

  // Update button state
  const submitButton = document.querySelector(
    '#password-form button[type="submit"]'
  );
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Updating...';

  // Call API to update password
  fetch("http://web.practicesnow.com/api/v1/user/change-password", {
    method: "POST",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: getAuthHeader(),
    },
    body: JSON.stringify(passwordData),
  })
    .then((response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then(({ isSuccess, data, status }) => {
      if (isSuccess) {
        // Success message - in English
        showNotification(
          "success",
          "Password Updated",
          "Your password has been changed successfully"
        );

        // Get form reference again to avoid ReferenceError
        const passwordFormElement = document.getElementById("password-form");
        if (passwordFormElement) {
          passwordFormElement.reset();
        }

        // Optional: Update stored user information
        const currentUser = getUserFromStorage();
        if (currentUser) {
          currentUser.password = md5(newPassword);
          updateUserInStorage(currentUser);
        }
      } else {
        // Handle error cases - in English
        let errorMessage = "Password update failed";

        if (status === 401) {
          errorMessage = "Current password is incorrect";
        } else if (status === 422) {
          errorMessage =
            data.message || "Validation error, please check all fields";
        } else if (status === 403) {
          errorMessage = "You don't have permission to perform this action";
        } else {
          errorMessage = data.message || "Server error, please try again later";
        }

        showNotification("error", "Password Update Failed", errorMessage);
      }
    })
    .catch((error) => {
      console.error("Password update error:", error);
      showNotification(
        "error",
        "Password Update Failed",
        "Network error or server not responding"
      );
    })
    .finally(() => {
      // Restore button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    });
}

/**
 * Update password strength indicator
 * @param {Event} e - Input event
 */
function updatePasswordStrength(e) {
  const password = e.target.value;
  const strength = calculatePasswordStrength(password);
  const progressBar = document.getElementById("password-strength");
  const feedback = document.getElementById("password-feedback");

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
 * Calculate password strength
 * @param {string} password - Password
 * @returns {{score: number, feedback: string}} - Password strength score and feedback
 */
function calculatePasswordStrength(password) {
  let score = 0;
  let feedback = "Password is too weak";

  if (!password) return { score, feedback };

  // Length check
  if (password.length >= 8) score++;

  // Complexity check
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
 * Get user authentication token
 * @returns {string|null} - JWT token or null
 */
function getToken() {
  // Directly get accessToken from localStorage
  const accessToken = localStorage.getItem("accessToken");
  return accessToken || null;
}

/**
 * Get authentication header information
 * @returns {string} - Authentication header string
 */
function getAuthHeader() {
  const token = getToken();
  return token ? `Bearer ${token}` : "";
}

/**
 * Get current user from storage
 * @returns {Object|null} - User object or null
 */
function getUserFromStorage() {
  const userFromLocal = localStorage.getItem("currentUser");
  const userFromSession = sessionStorage.getItem("currentUser");

  if (userFromLocal) {
    try {
      return JSON.parse(userFromLocal);
    } catch (e) {
      console.error("Parsing user data error:", e);
      return null;
    }
  } else if (userFromSession) {
    try {
      return JSON.parse(userFromSession);
    } catch (e) {
      console.error("Parsing user data error:", e);
      return null;
    }
  }

  return null;
}

/**
 * Update user information in storage
 * @param {Object} user - User object
 */
function updateUserInStorage(user) {
  if (localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else if (sessionStorage.getItem("currentUser")) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  }
}

/**
 * Show notification
 * @param {string} type - Notification type (success, error, warning, info)
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 */
function showNotification(type, title, message) {
  if (typeof showToast === "function") {
    // If there's an existing notification function, use it
    showToast(message, type);
    return;
  }

  // Create custom notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type} show`;

  notification.innerHTML = `
    <div class="notification-header">
      <h6 class="notification-title">${title}</h6>
      <button class="notification-close">&times;</button>
    </div>
    <p class="notification-message">${message}</p>
  `;

  document.body.appendChild(notification);

  // Close button event
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Auto close notification
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}
