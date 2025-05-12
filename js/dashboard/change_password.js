/**
 * 修改密码功能实现
 * 包含表单验证、MD5加密和API调用
 */

document.addEventListener("DOMContentLoaded", function () {
  const passwordForm = document.getElementById("password-form");

  if (passwordForm) {
    // 密码强度监听
    const newPasswordInput = document.getElementById("new-password");
    if (newPasswordInput) {
      newPasswordInput.addEventListener("input", updatePasswordStrength);
    }

    // 表单提交监听
    passwordForm.addEventListener("submit", handlePasswordUpdate);
  }
});

/**
 * 处理密码更新
 * @param {Event} e - 表单提交事件
 */
function handlePasswordUpdate(e) {
  e.preventDefault();

  // 获取表单值
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // 表单验证
  if (!currentPassword || !newPassword || !confirmPassword) {
    showNotification("error", "Form Error", "All password fields are required");
    return;
  }

  // 密码长度验证
  if (newPassword.length < 8) {
    showNotification(
      "error",
      "Invalid Password",
      "New password must be at least 8 characters"
    );
    return;
  }

  // 密码复杂度验证 (至少包含一个大写字母、一个数字和一个特殊字符)
  const passwordStrength = calculatePasswordStrength(newPassword);
  if (passwordStrength.score < 3) {
    showNotification(
      "error",
      "Password Too Weak",
      "Please use a password with uppercase letters, numbers, and special characters"
    );
    return;
  }

  // 新密码与确认密码匹配验证
  if (newPassword !== confirmPassword) {
    showNotification(
      "error",
      "Password Mismatch",
      "New password and confirmation don't match"
    );
    return;
  }

  // 准备提交数据 (使用MD5加密密码)
  const passwordData = {
    current_password: md5(currentPassword),
    new_password: md5(newPassword),
    password_confirm: md5(confirmPassword),
  };

  // 更新按钮状态
  const submitButton = document.querySelector(
    '#password-form button[type="submit"]'
  );
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Updating...';

  // 调用API更新密码
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
      console.error("密码更新错误:", error);
      showNotification("error", "密码更新失败", "网络错误或服务器无响应");
    })
    .finally(() => {
      // 恢复按钮状态
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    });
}

/**
 * 更新密码强度指示器
 * @param {Event} e - 输入事件
 */
function updatePasswordStrength(e) {
  const password = e.target.value;
  const strength = calculatePasswordStrength(password);
  const progressBar = document.getElementById("password-strength");
  const feedback = document.getElementById("password-feedback");

  if (!progressBar || !feedback) return;

  // 更新进度条
  progressBar.style.width = `${strength.score * 25}%`;

  // 设置适当的颜色
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

  // 更新反馈文本
  feedback.textContent = strength.feedback;
}

/**
 * 计算密码强度
 * @param {string} password - 密码
 * @returns {{score: number, feedback: string}} - 密码强度评分和反馈
 */
function calculatePasswordStrength(password) {
  let score = 0;
  let feedback = "Password is too weak";

  if (!password) return { score, feedback };

  // 长度检查
  if (password.length >= 8) score++;

  // 复杂度检查
  if (password.match(/[A-Z]/)) score++;
  if (password.match(/[0-9]/)) score++;
  if (password.match(/[^A-Za-z0-9]/)) score++;

  // 设置反馈
  if (score === 1) feedback = "Password is weak";
  else if (score === 2) feedback = "Password is moderate";
  else if (score === 3) feedback = "Password is strong";
  else if (score === 4) feedback = "Password is very strong";

  return { score, feedback };
}

/**
 * 获取用户认证令牌
 * @returns {string|null} - JWT令牌或null
 */
function getToken() {
  // 直接从localStorage获取accessToken
  const accessToken = localStorage.getItem("accessToken");
  return accessToken || null;
}

/**
 * 获取认证头信息
 * @returns {string} - 认证头字符串
 */
function getAuthHeader() {
  const token = getToken();
  return token ? `Bearer ${token}` : "";
}

/**
 * 从存储中获取当前用户
 * @returns {Object|null} - 用户对象或null
 */
function getUserFromStorage() {
  const userFromLocal = localStorage.getItem("currentUser");
  const userFromSession = sessionStorage.getItem("currentUser");

  if (userFromLocal) {
    try {
      return JSON.parse(userFromLocal);
    } catch (e) {
      console.error("解析用户数据错误:", e);
      return null;
    }
  } else if (userFromSession) {
    try {
      return JSON.parse(userFromSession);
    } catch (e) {
      console.error("解析用户数据错误:", e);
      return null;
    }
  }

  return null;
}

/**
 * 更新存储中的用户信息
 * @param {Object} user - 用户对象
 */
function updateUserInStorage(user) {
  if (localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else if (sessionStorage.getItem("currentUser")) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  }
}

/**
 * 显示通知
 * @param {string} type - 通知类型 (success, error, warning, info)
 * @param {string} title - 通知标题
 * @param {string} message - 通知消息
 */
function showNotification(type, title, message) {
  if (typeof showToast === "function") {
    // 如果有现成的通知函数，使用它
    showToast(message, type);
    return;
  }

  // 创建自定义通知
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

  // 关闭按钮事件
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // 自动关闭通知
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}
