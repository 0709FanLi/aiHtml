// Sample Data for Demo
const sampleHistoryData = [
  {
    id: 1,
    title: "The Forgotten Kingdom - Chapter 3",
    type: "polish",
    date: "2025-05-15 14:32",
    originalText:
      "The castle was old and scary. It had many towers that reached up to the sky. The princess lived there for many years, waiting for someone to save her.",
    enhancedText:
      "The ancient castle loomed <span class='added-text'>ominously</span> against the <span class='added-text'>twilight</span> sky, its <span class='deleted-text'>many</span> <span class='modified-text'>weathered</span> towers reaching <span class='modified-text'>toward</span> the heavens. The princess had <span class='modified-text'>resided</span> there for many years, <span class='deleted-text'>waiting for someone to save her</span> <span class='added-text'>her heart growing colder with each passing season as she awaited her salvation</span>.",
  },
  {
    id: 2,
    title: "Dragon's Curse - Opening Scene",
    type: "expand",
    date: "2025-05-10 09:17",
    originalText: "The dragon breathed fire. The village burned.",
    enhancedText:
      "The <span class='modified-text'>massive</span> dragon <span class='added-text'>unfurled its leathery wings and</span> breathed <span class='modified-text'>a torrent of searing</span> fire <span class='added-text'>from its ancient, cavernous maw</span>. The village <span class='deleted-text'>burned</span> <span class='added-text'>erupted in flames, thatched roofs igniting like kindling as terrified screams echoed through the valley. Mothers clutched children to their breasts as they fled, while the men futilely raised pitchforks against the unstoppable inferno raining from above</span>.",
  },
  {
    id: 3,
    title: "The Wizard's Apprentice - Draft",
    type: "condense",
    date: "2025-05-05 16:45",
    originalText:
      "The young boy named Tim was very excited about his first day as a wizard's apprentice. He had always dreamed of learning magic ever since he was a very small child. His parents were farmers who worked in the fields everyday, but Tim knew he wanted a different life. When the wizard Aldobrand came to their small village looking for an apprentice, Tim volunteered immediately. The wizard was very old and had a long white beard that went down to his knees. He wore blue robes with stars and moons on them.",
    enhancedText:
      "<span class='deleted-text'>The young boy named</span> Tim <span class='modified-text'>eagerly anticipated</span> his first day as <span class='deleted-text'>a</span> <span class='modified-text'>the</span> wizard's apprentice<span class='deleted-text'>. He had always dreamed of learning magic ever since he was a very small child</span>. <span class='deleted-text'>His parents were farmers who worked in the fields everyday, but Tim knew he wanted a different life.</span> <span class='modified-text'>When</span> <span class='deleted-text'>the wizard</span> Aldobrand <span class='deleted-text'>came to their small village looking for an apprentice, Tim volunteered immediately. The wizard was very old and</span> <span class='modified-text'>- ancient, with</span> a <span class='modified-text'>knee-length</span> <span class='deleted-text'>long</span> white beard <span class='deleted-text'>that went down to his knees</span> <span class='modified-text'>and</span> <span class='deleted-text'>. He wore</span> blue robes <span class='modified-text'>embroidered with</span> <span class='deleted-text'>with</span> stars and moons <span class='deleted-text'>on them</span>.",
  },
];

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginContent = document.getElementById("loginContent");
const registerContent = document.getElementById("registerContent");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const registerSubmitBtn = document.getElementById("registerSubmitBtn");
const userProfile = document.getElementById("userProfile");
const creditCount = document.getElementById("creditCount");
const badgeCredits = document.getElementById("badgeCredits");
const creditsBadge = document.getElementById("creditsBadge");
const historyLink = document.getElementById("historyLink");
const historySection = document.getElementById("historySection");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const novelText = document.getElementById("novelText");
const polishBtn = document.getElementById("polishBtn");
const expandBtn = document.getElementById("expandBtn");
const condenseBtn = document.getElementById("condenseBtn");
const resultSection = document.getElementById("resultSection");
const originalText = document.getElementById("originalText");
const enhancedText = document.getElementById("enhancedText");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const newEditBtn = document.getElementById("newEditBtn");
const loadingOverlay = document.getElementById("loadingOverlay");
const toastContainer = document.getElementById("toastContainer");
const purchaseModal = document.getElementById("purchaseModal");
const closePurchaseModal = document.getElementById("closePurchaseModal");
const purchaseButtons = document.querySelectorAll(".purchase-btn");
const planName = document.getElementById("planName");
const planDescription = document.getElementById("planDescription");
const planPrice = document.getElementById("planPrice");
const confirmPurchaseBtn = document.getElementById("confirmPurchaseBtn");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
const mobileMenuClose = document.querySelector(".mobile-menu-close");
const mobileLoginBtn = document.querySelector(".mobile-login-btn");
const mobileSignupBtn = document.querySelector(".mobile-signup-btn");
const mobileHistoryLink = document.querySelector(".mobile-history-link");

// State Variables
let isLoggedIn = false;
let usageCredits = 0;
let userHistory = [...sampleHistoryData];
let freeUsageUsed = false;

// Function to show toast notifications
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  let icon = "info-circle";
  if (type === "success") icon = "check-circle";
  if (type === "error") icon = "exclamation-circle";

  toast.innerHTML = `
                <div>
                    <i class="fas fa-${icon}"></i>
                    <span>${message}</span>
                </div>
                <button class="toast-close">&times;</button>
            `;

  toastContainer.appendChild(toast);

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.remove();
  }, 4000);

  // Remove on click
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.remove();
  });
}

// Toggle between login and register tabs
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginContent.style.display = "block";
  registerContent.style.display = "none";
  // Hide forgot password content when switching to login tab
  forgotPasswordContent.style.display = "none";
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerContent.style.display = "block";
  loginContent.style.display = "none";
  // Hide forgot password content when switching to register tab
  forgotPasswordContent.style.display = "none";
});

// Show/Hide Modal functions
function showAuthModal() {
  authModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideAuthModal() {
  authModal.style.display = "none";
  document.body.style.overflow = "auto";
  resetAllForms();
}

// Function to reset all form fields and UI states
function resetAllForms() {
  // Reset login form
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";

  // Reset register form
  document.getElementById("registerName").value = "";
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";
  document.getElementById("registerConfirmPassword").value = "";

  // Reset forgot password form
  document.getElementById("resetEmail").value = "";

  // Reset UI state - ensure login form is shown by default
  document.getElementById("forgotPasswordContent").style.display = "none";
  document.getElementById("loginContent").style.display = "block";
  document.getElementById("registerContent").style.display = "none";

  // Reset tab state
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
}

function showPurchaseModal(plan, price, credits, subscription = false) {
  planName.textContent = plan + " Plan";
  planPrice.textContent = "$" + price;

  if (subscription) {
    planDescription.textContent = `${subscription} subscription with ${credits} credits`;
  } else {
    planDescription.textContent = `One-time purchase of ${credits} credits`;
  }

  purchaseModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hidePurchaseModal() {
  purchaseModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Login/Signup Event Listeners
loginBtn.addEventListener("click", showAuthModal);
signupBtn.addEventListener("click", () => {
  showAuthModal();
  registerTab.click();
});
closeAuthModal.addEventListener("click", hideAuthModal);

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  // Reset user state
  isLoggedIn = false;
  usageCredits = 0;
  userHistory = [...sampleHistoryData]; // Reset to sample data

  // Update UI
  userProfile.style.display = "none";
  loginBtn.style.display = "block";
  signupBtn.style.display = "block";
  creditsBadge.style.display = "none";

  // Show login/signup buttons in mobile menu
  document.querySelector(".mobile-login-btn").parentElement.style.display =
    "block";
  document.querySelector(".mobile-signup-btn").parentElement.style.display =
    "block";

  // Hide history section if it's open
  historySection.style.display = "none";

  // Show toast notification
  showToast("You have been logged out successfully", "info");
});

// Forgot Password Event Listeners
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const backToLoginLink = document.getElementById("backToLoginLink");
const resetSubmitBtn = document.getElementById("resetSubmitBtn");
const forgotPasswordContent = document.getElementById("forgotPasswordContent");

forgotPasswordLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginContent.style.display = "none";
  forgotPasswordContent.style.display = "block";
});

backToLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  forgotPasswordContent.style.display = "none";
  loginContent.style.display = "block";
});

resetSubmitBtn.addEventListener("click", () => {
  const resetEmail = document.getElementById("resetEmail").value;

  if (!resetEmail) {
    showToast("Please enter your email address", "error");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(resetEmail)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  // Show loading overlay
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Sending reset link...";

  // Simulate sending reset link
  setTimeout(() => {
    loadingOverlay.style.display = "none";
    showToast("Password reset link has been sent to your email", "success");

    // Return to login screen after 2 seconds
    setTimeout(() => {
      forgotPasswordContent.style.display = "none";
      loginContent.style.display = "block";
      document.getElementById("resetEmail").value = "";
    }, 2000);
  }, 1500);
});

closePurchaseModal.addEventListener("click", hidePurchaseModal);

// Privacy Policy Modal Functions
const privacyPolicyModal = document.getElementById("privacyPolicyModal");
const closePrivacyModal = document.getElementById("closePrivacyModal");
const privacyPolicyLink = document.getElementById("privacyPolicyLink");

function showPrivacyPolicyModal() {
  privacyPolicyModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hidePrivacyPolicyModal() {
  privacyPolicyModal.style.display = "none";
  document.body.style.overflow = "auto";
}

privacyPolicyLink.addEventListener("click", (e) => {
  e.preventDefault();
  showPrivacyPolicyModal();
});

closePrivacyModal.addEventListener("click", hidePrivacyPolicyModal);

// Close privacy policy modal when clicking outside
privacyPolicyModal.addEventListener("click", (e) => {
  if (e.target === privacyPolicyModal) {
    hidePrivacyPolicyModal();
  }
});

// Terms of Service Modal Functions
const termsModal = document.getElementById("termsModal");
const closeTermsModal = document.getElementById("closeTermsModal");
const termsOfServiceLink = document.getElementById("termsOfServiceLink");

function showTermsModal() {
  termsModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function hideTermsModal() {
  termsModal.style.display = "none";
  document.body.style.overflow = "auto";
}

termsOfServiceLink.addEventListener("click", (e) => {
  e.preventDefault();
  showTermsModal();
});

closeTermsModal.addEventListener("click", hideTermsModal);

// Close terms of service modal when clicking outside
termsModal.addEventListener("click", (e) => {
  if (e.target === termsModal) {
    hideTermsModal();
  }
});

// Login Form Submission
loginSubmitBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const termsChecked = document.getElementById("loginTermsCheck").checked;

  if (!email || !password) {
    showToast("Please fill in all fields", "error");
    return;
  }

  if (!termsChecked) {
    showToast(
      "Please agree to the Terms of Service and Privacy Policy",
      "error"
    );
    return;
  }

  // Show loading overlay
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Logging in...";

  // Encrypt the password with MD5
  const md5Password = md5(password);

  // Prepare login data
  const loginData = {
    email: email,
    password: md5Password,
  };

  // Call login API
  fetch("http://web.novelbeautify.com/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      // Check response status
      const isSuccess = response.status >= 200 && response.status < 300;
      // Parse JSON response
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess) {
        // Login successful
        const responseData = result.data;

        // Check if API returned success
        if (responseData.ok !== 1) {
          throw new Error(responseData.message || "Login failed");
        }

        // Get user data from response
        const data = responseData.data;
        const userData = data.user;

        // Set login state and credits
        isLoggedIn = true;
        usageCredits = 30; // Can be adjusted based on API response

        // Update user name display
        document.getElementById("userName").textContent = userData.name;

        // Store tokens if needed
        // localStorage.setItem("accessToken", data.access_token);

        updateUIAfterLogin();
        hideAuthModal();
        showToast("Successfully logged in!", "success");
      } else {
        // Login failed
        throw new Error(
          result.data.error || `Login failed, status code: ${result.status}`
        );
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      showToast(error.message || "Email or password is incorrect", "error");
    })
    .finally(() => {
      // Hide loading overlay
      loadingOverlay.style.display = "none";
    });
});

// Register Form Submission
registerSubmitBtn.addEventListener("click", () => {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;
  const termsChecked = document.getElementById("registerTermsCheck").checked;

  if (!name || !email || !password || !confirmPassword) {
    showToast("Please fill in all fields", "error");
    return;
  }

  if (password !== confirmPassword) {
    showToast("Passwords do not match", "error");
    return;
  }

  if (!termsChecked) {
    showToast(
      "Please agree to the Terms of Service and Privacy Policy",
      "error"
    );
    return;
  }

  // Show loading overlay
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Registering...";

  // Encrypt passwords with MD5
  const md5Password = md5(password);
  const md5ConfirmPassword = md5(confirmPassword);

  // Prepare API request data
  const userData = {
    email: email,
    name: name,
    password: md5Password,
    password_confirm: md5ConfirmPassword,
  };

  // Call API
  fetch("http://web.novelbeautify.com/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      // Check response status
      const isSuccess = response.status >= 200 && response.status < 300;
      // Parse JSON response
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess) {
        // Registration successful
        isLoggedIn = true;
        usageCredits = 5; // Welcome credits for new users
        document.getElementById("userName").textContent = name;
        updateUIAfterLogin();
        hideAuthModal();
        showToast("Account created successfully!", "success");
      } else {
        // Registration failed
        throw new Error(
          result.data.error ||
            `Registration failed, status code: ${result.status}`
        );
      }
    })
    .catch((error) => {
      console.error("Registration error:", error);
      showToast(
        error.message ||
          "An error occurred during registration, please try again",
        "error"
      );
    })
    .finally(() => {
      // Hide loading overlay
      loadingOverlay.style.display = "none";
    });
});

// Update UI after login
function updateUIAfterLogin() {
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  userProfile.style.display = "flex";
  creditCount.textContent = usageCredits;
  badgeCredits.textContent = usageCredits;
  creditsBadge.style.display = "flex";

  // Hide login/signup in mobile menu
  document.querySelector(".mobile-login-btn").parentElement.style.display =
    "none";
  document.querySelector(".mobile-signup-btn").parentElement.style.display =
    "none";

  // Generate history items
  renderHistoryItems();
}

// History related functions
historyLink.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isLoggedIn) {
    showToast("Please login to view your history", "info");
    showAuthModal();
    return;
  }

  showSection("history");
});

mobileHistoryLink.addEventListener("click", (e) => {
  e.preventDefault();

  if (!isLoggedIn) {
    showToast("Please login to view your history", "info");
    showAuthModal();
    return;
  }

  showSection("history");
  closeMobileMenu();
});

function toggleHistorySection() {
  if (historySection.style.display === "block") {
    historySection.style.display = "none";
    resultSection.style.display = "none";
  } else {
    historySection.style.display = "block";
    resultSection.style.display = "none";
  }
}

function renderHistoryItems() {
  historyList.innerHTML = "";

  if (userHistory.length === 0) {
    historyList.innerHTML = `
                    <div class="history-item">
                        <p>No history items yet. Start enhancing your texts!</p>
                    </div>
                `;
    return;
  }

  userHistory.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.dataset.id = item.id;

    historyItem.innerHTML = `
                    <div class="history-content">
                        <h4>${item.title} <span class="history-type ${
      item.type
    }">${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span></h4>
                        <div class="history-date">${item.date}</div>
                    </div>
                    <div>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `;

    historyItem.addEventListener("click", () => {
      loadHistoryItem(item);
    });

    historyList.appendChild(historyItem);
  });
}

function loadHistoryItem(item) {
  originalText.innerHTML = item.originalText;
  enhancedText.innerHTML = item.enhancedText;

  showSection("result");
}

// Create a custom confirmation modal for the page
function showConfirmationModal(message, confirmCallback) {
  // Create a modal overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.style.display = "flex";

  // Create the modal
  const modal = document.createElement("div");
  modal.className = "modal";

  // Create header
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = "<h2>Confirmation</h2>";

  // Create close button
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  modalHeader.appendChild(closeBtn);

  // Create content
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.innerHTML = `<p>${message}</p>`;

  // Create actions
  const actions = document.createElement("div");
  actions.className = "modal-actions";
  actions.style.display = "flex";
  actions.style.justifyContent = "flex-end";
  actions.style.gap = "10px";
  actions.style.marginTop = "20px";

  // Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn";
  cancelBtn.style.background = "var(--card-bg)";
  cancelBtn.style.border = "1px solid rgba(255, 255, 255, 0.1)";
  cancelBtn.textContent = "Cancel";

  // Confirm button
  const confirmBtn = document.createElement("button");
  confirmBtn.className = "btn btn-secondary";
  confirmBtn.textContent = "Confirm";

  actions.appendChild(cancelBtn);
  actions.appendChild(confirmBtn);
  modalContent.appendChild(actions);

  // Assemble modal
  modal.appendChild(modalHeader);
  modal.appendChild(modalContent);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
  document.body.style.overflow = "hidden"; // Prevent scrolling

  // Add event listeners
  closeBtn.addEventListener("click", () => {
    modalOverlay.remove();
    document.body.style.overflow = "auto";
  });

  cancelBtn.addEventListener("click", () => {
    modalOverlay.remove();
    document.body.style.overflow = "auto";
  });

  confirmBtn.addEventListener("click", () => {
    modalOverlay.remove();
    document.body.style.overflow = "auto";
    if (confirmCallback) confirmCallback();
  });

  // Close on click outside
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.remove();
      document.body.style.overflow = "auto";
    }
  });
}

// Replace the original confirm in clearHistoryBtn event
clearHistoryBtn.addEventListener("click", () => {
  showConfirmationModal(
    "Are you sure you want to clear your history? This cannot be undone.",
    () => {
      userHistory = [];
      renderHistoryItems();
      showToast("History cleared successfully", "success");
    }
  );
});

// File upload handling
fileInput.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    fileName.textContent = file.name;

    // Simulate file reading
    setTimeout(() => {
      // For demo, just create some fake text based on the file name
      const fakeText = `This is a sample text extracted from ${file.name}. In the distant kingdom of Eldoria, magic flowed through the land like rivers of liquid starlight. Wizards walked among commoners, their robes shimmering with power, their staffs adorned with crystals that pulsed in rhythm with their heartbeats. The young apprentice Thorne stared in awe at the Grand Academy of Arcane Arts, its towers spiraling impossibly high, defying both gravity and logic. Today was his first day, and his hands trembled with equal parts excitement and terror.`;

      novelText.value = fakeText;
      showToast("File content loaded successfully", "success");
    }, 1000);
  }
});

// Text processing functions
function processText(type) {
  const text = novelText.value.trim();

  if (!text) {
    showToast("Please enter or upload some text first", "error");
    return;
  }

  // Check if user has credits
  if (!isLoggedIn && freeUsageUsed) {
    showToast(
      "You have used your free usage. Please login or sign up to continue.",
      "info"
    );
    showAuthModal();
    return;
  }

  if (isLoggedIn && usageCredits <= 0) {
    showToast(
      "You have no credits left. Please purchase more to continue.",
      "info"
    );
    purchaseButtons[2].click(); // Show modal for standard plan
    return;
  }

  // Show loading overlay
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent = `${
    type.charAt(0).toUpperCase() + type.slice(1)
  }ing your text...`;

  // Simulate processing delay
  setTimeout(() => {
    // Generate enhanced text based on the type
    let processedText = "";

    if (type === "polish") {
      processedText = polishText(text);
    } else if (type === "expand") {
      processedText = expandText(text);
    } else if (type === "condense") {
      processedText = condenseText(text);
    }

    // Display results
    originalText.textContent = text;
    enhancedText.innerHTML = processedText;

    // Show result section
    resultSection.style.display = "block";
    resultSection.scrollIntoView({ behavior: "smooth" });

    // Hide loading overlay
    loadingOverlay.style.display = "none";

    // Update credits if logged in
    if (isLoggedIn) {
      usageCredits--;
      creditCount.textContent = usageCredits;
      badgeCredits.textContent = usageCredits;

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        title: `Document ${userHistory.length + 1}`,
        type: type,
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        originalText: text,
        enhancedText: processedText,
      };

      userHistory.unshift(newHistoryItem);
      renderHistoryItems();
    } else {
      freeUsageUsed = true;
    }

    showToast(`Text successfully ${type}ed!`, "success");
  }, 3000);
}

// Text processing algorithms (simulated)
function polishText(text) {
  // Simulated polishing algorithm
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let polishedHTML = "";

  sentences.forEach((sentence) => {
    const rand = Math.random();

    if (rand < 0.3) {
      // Replace some words
      sentence = sentence
        .replace(
          /old/g,
          '<span class="deleted-text">old</span> <span class="modified-text">ancient</span>'
        )
        .replace(
          /scary/g,
          '<span class="deleted-text">scary</span> <span class="modified-text">terrifying</span>'
        )
        .replace(
          /big/g,
          '<span class="deleted-text">big</span> <span class="modified-text">massive</span>'
        )
        .replace(
          /small/g,
          '<span class="deleted-text">small</span> <span class="modified-text">tiny</span>'
        )
        .replace(
          /walked/g,
          '<span class="deleted-text">walked</span> <span class="modified-text">strode</span>'
        )
        .replace(
          /ran/g,
          '<span class="deleted-text">ran</span> <span class="modified-text">dashed</span>'
        )
        .replace(
          /said/g,
          '<span class="deleted-text">said</span> <span class="modified-text">declared</span>'
        );
    } else if (rand < 0.6) {
      // Add adjectives or adverbs
      sentence = sentence
        .replace(
          /the castle/gi,
          'the <span class="added-text">ancient</span> castle'
        )
        .replace(
          /the wizard/gi,
          'the <span class="added-text">mysterious</span> wizard'
        )
        .replace(
          /the dragon/gi,
          'the <span class="added-text">fearsome</span> dragon'
        )
        .replace(/walked/g, 'walked <span class="added-text">cautiously</span>')
        .replace(/said/g, 'said <span class="added-text">confidently</span>');
    }

    polishedHTML += sentence + " ";
  });

  return polishedHTML.trim();
}

function expandText(text) {
  // Simulated expansion algorithm
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let expandedHTML = "";

  sentences.forEach((sentence) => {
    const rand = Math.random();

    if (rand < 0.4) {
      // Add descriptive phrases
      expandedHTML +=
        sentence.trim() +
        ' <span class="added-text">The air was thick with anticipation, a palpable tension that seemed to make the very stones of the castle walls sweat with anxiety.</span> ';
    } else if (rand < 0.7) {
      // Add character thoughts or background
      expandedHTML +=
        sentence.trim() +
        ' <span class="added-text">Memories of the ancient prophecies flooded through her mind, stories told by firelight of heroes and monsters, destinies written in stars long before her birth.</span> ';
    } else {
      // Add sensory details
      expandedHTML +=
        sentence.trim() +
        ' <span class="added-text">A cold wind whispered through the chamber, carrying the scent of pine and distant smoke, the promise of winter on its breath.</span> ';
    }
  });

  return expandedHTML.trim();
}

function condenseText(text) {
  // Simulated condensing algorithm
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  let condensedHTML = "";

  sentences.forEach((sentence) => {
    // Remove filler words and phrases
    let condensed = sentence
      .replace(
        /\b(very|really|actually|basically|honestly|literally)\b\s*/gi,
        '<span class="deleted-text">$1 </span>'
      )
      .replace(
        /\b(in order to|due to the fact that|for the purpose of|in the event that)\b/gi,
        '<span class="deleted-text">$1</span> to'
      )
      .replace(
        /\b(at this point in time|at the present time)\b/gi,
        '<span class="deleted-text">$1</span> now'
      )
      .replace(
        /\b(it is important to note that|it should be noted that)\b/gi,
        '<span class="deleted-text">$1</span>'
      );

    // Randomly remove some descriptive sections
    if (sentence.length > 100) {
      const parts = sentence.split(",");
      if (parts.length > 2) {
        const removeIndex = Math.floor(Math.random() * (parts.length - 1)) + 1;
        parts[
          removeIndex
        ] = `<span class="deleted-text">${parts[removeIndex]}</span>`;
        condensed = parts.join(",");
      }
    }

    condensedHTML += condensed + " ";
  });

  return condensedHTML.trim();
}

// Action button event listeners
polishBtn.addEventListener("click", () => processText("polish"));
expandBtn.addEventListener("click", () => processText("expand"));
condenseBtn.addEventListener("click", () => processText("condense"));

// Result action buttons
copyBtn.addEventListener("click", () => {
  // Create a temporary element
  const tempElement = document.createElement("div");
  tempElement.innerHTML = enhancedText.innerHTML;

  // Extract text content without HTML tags
  const textToCopy = tempElement.textContent;

  // Copy to clipboard
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showToast("Text copied to clipboard!", "success");
    })
    .catch((err) => {
      showToast("Failed to copy text.", "error");
      console.error("Could not copy text: ", err);
    });
});

downloadBtn.addEventListener("click", () => {
  // Create a temporary element
  const tempElement = document.createElement("div");
  tempElement.innerHTML = enhancedText.innerHTML;

  // Extract text content without HTML tags
  const textToDownload = tempElement.textContent;

  // Create a Blob
  const blob = new Blob([textToDownload], { type: "text/plain" });

  // Create download link
  const a = document.createElement("a");
  a.download = "enhanced-text.txt";
  a.href = window.URL.createObjectURL(blob);
  a.style.display = "none";

  // Append to the document and trigger download
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  window.URL.revokeObjectURL(a.href);

  showToast("Download started!", "success");
});

newEditBtn.addEventListener("click", () => {
  showSection("features");
  novelText.focus();
});

// Purchase buttons
purchaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isLoggedIn) {
      showToast("Please login to purchase credits", "info");
      showAuthModal();
      return;
    }

    const plan = button.dataset.plan;
    const price = button.dataset.price;
    const credits = button.dataset.credits;

    let subscription = null;
    if (plan === "monthly") subscription = "Monthly";
    if (plan === "annual") subscription = "Annual";

    showPurchaseModal(
      plan.charAt(0).toUpperCase() + plan.slice(1),
      price,
      credits,
      subscription
    );
  });
});

// Confirm purchase
confirmPurchaseBtn.addEventListener("click", () => {
  loadingOverlay.style.display = "flex";
  document.getElementsByClassName("loading-text")[0].textContent =
    "Processing payment...";

  setTimeout(() => {
    loadingOverlay.style.display = "none";
    hidePurchaseModal();

    const purchasedCredits = parseInt(
      planDescription.textContent.match(/\d+/)[0]
    );
    usageCredits += purchasedCredits;
    creditCount.textContent = usageCredits;
    badgeCredits.textContent = usageCredits;

    showToast("Purchase successful! Credits added to your account.", "success");
  }, 2000);
});

// Payment method selection
const paymentMethods = document.querySelectorAll(".payment-method");
paymentMethods.forEach((method) => {
  method.addEventListener("click", () => {
    paymentMethods.forEach((m) => m.classList.remove("selected"));
    method.classList.add("selected");
  });
});

// Mobile menu functions
function openMobileMenu() {
  mobileMenu.classList.add("active");
  mobileMenuBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";

  // Update mobile menu based on login state
  if (isLoggedIn) {
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "none";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "none";
  } else {
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "block";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "block";
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  mobileMenuBackdrop.classList.remove("active");
  document.body.style.overflow = "auto";
}

mobileMenuBtn.addEventListener("click", openMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);
mobileMenuBackdrop.addEventListener("click", closeMobileMenu);

mobileLoginBtn.addEventListener("click", () => {
  closeMobileMenu();
  showAuthModal();
});

mobileSignupBtn.addEventListener("click", () => {
  closeMobileMenu();
  showAuthModal();
  registerTab.click();
});

// Initialize with sample text
novelText.value =
  "The ancient castle stood atop the hill, its towers reaching towards the darkening sky. Inside, the princess waited, her heart growing colder with each passing day. She gazed out the window, wondering if anyone would ever come to rescue her from the curse that had befallen this forgotten kingdom.";

// Navigation Logic
const sections = {
  hero: document.querySelector(".hero"),
  home: document.querySelector("#home"),
  features: document.querySelector(".input-section"),
  pricing: document.querySelector(".pricing-section"),
  result: document.querySelector(".result-section"),
  history: document.querySelector(".history-section"),
};

// Navigation links
const navLinks = {
  home: document.querySelectorAll("#homeLink, #mobileHomeLink"),
  features: document.querySelectorAll("#featuresLink, #mobileFeaturesLink"),
  pricing: document.querySelectorAll("#pricingLink, #mobilePricingLink"),
};

// Function to show a specific section and hide others
function showSection(sectionName) {
  // 特殊处理Home导航
  if (sectionName === "home") {
    // 显示Hero和Home两个部分
    sections.hero.style.display = "block";
    sections.home.style.display = "block";

    // 隐藏其他部分
    Object.keys(sections).forEach((key) => {
      if (key !== "hero" && key !== "home") {
        sections[key].style.display = "none";
      }
    });

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  // 处理其他导航情况
  // 首先隐藏所有部分（包括hero和home）
  Object.keys(sections).forEach((key) => {
    if (key !== sectionName) {
      sections[key].style.display = "none";
    }
  });

  // 显示请求的部分
  sections[sectionName].style.display = "block";

  // 滚动到该部分
  sections[sectionName].scrollIntoView({ behavior: "smooth" });
}

// Add event listeners to navigation links
navLinks.home.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // 展示Hero和Home两个部分
    sections.hero.style.display = "block";
    sections.home.style.display = "block";

    // 隐藏其他部分
    Object.keys(sections).forEach((key) => {
      if (key !== "hero" && key !== "home") {
        sections[key].style.display = "none";
      }
    });

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (link.id === "mobileHomeLink") closeMobileMenu();
  });
});

navLinks.features.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("features");
    if (link.id === "mobileFeaturesLink") closeMobileMenu();
  });
});

navLinks.pricing.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showSection("pricing");
    if (link.id === "mobilePricingLink") closeMobileMenu();
  });
});

// Initialize UI based on login state
function initializeUI() {
  console.log("Initializing UI, login state:", isLoggedIn);
  console.log("User profile element:", userProfile);
  console.log("Current display style:", userProfile.style.display);

  // 初始化页面时应该与点击Home按钮效果一致
  // 显示hero和home部分
  sections.hero.style.display = "block";
  sections.home.style.display = "block";

  // 隐藏其他所有部分
  Object.keys(sections).forEach((key) => {
    if (key !== "hero" && key !== "home") {
      sections[key].style.display = "none";
    }
  });

  if (isLoggedIn) {
    // User is logged in
    console.log("User is logged in, showing profile");
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    userProfile.style.display = "flex";
    creditCount.textContent = usageCredits;
    badgeCredits.textContent = usageCredits;
    creditsBadge.style.display = "flex";
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "none";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "none";

    // Generate history items if logged in
    renderHistoryItems();
  } else {
    // User is not logged in
    console.log("User not logged in, hiding profile");
    loginBtn.style.display = "block";
    signupBtn.style.display = "block";
    userProfile.style.display = "none";
    creditsBadge.style.display = "none";
    document.querySelector(".mobile-login-btn").parentElement.style.display =
      "block";
    document.querySelector(".mobile-signup-btn").parentElement.style.display =
      "block";
  }

  console.log(
    "After initialization, profile display:",
    userProfile.style.display
  );
}

// Call initialization function when page loads
document.addEventListener("DOMContentLoaded", initializeUI);

// Get Started buttons
document.getElementById("getStartedBtn").addEventListener("click", () => {
  showSection("features");
});

// Home page CTA button (原About CTA按钮)
document.querySelector(".about-cta .btn").addEventListener("click", () => {
  showSection("features");
  closeMobileMenu(); // 如果在移动端，关闭菜单
});

document.addEventListener("DOMContentLoaded", function () {
  initializeUI();

  // 添加隐私政策和服务条款链接点击事件
  const privacyLinks = document.querySelectorAll(".privacy-link");
  const termsLinks = document.querySelectorAll(".terms-link");

  privacyLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showPrivacyPolicyModal();
    });
  });

  termsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showTermsModal();
    });
  });
});
