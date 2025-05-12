/**
 * Dashboard页面Recent Activity功能
 */

// 更新Dashboard概览Recent Activity功能
function updateRecentActivity() {
  // 获取访问令牌
  const accessToken =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    "";

  // 如果没有令牌或未登录，不加载数据
  if (!accessToken || !isLoggedIn) {
    return;
  }

  // 构建请求参数（使用和历史记录相同的接口，但只取前3条）
  const requestData = {
    page: 1,
    page_size: 3, // 只获取3条最新记录
  };

  // 发起请求获取历史记录
  fetch("http://web.practicesnow.com/api/v1/quiz/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      // 检查响应状态
      const isSuccess = response.status >= 200 && response.status < 300;
      return response.json().then((data) => {
        return { isSuccess, data, status: response.status };
      });
    })
    .then((result) => {
      if (result.isSuccess && result.data.ok === 1) {
        // 成功获取数据
        const responseData = result.data.data;
        const quizItems = responseData.items;

        // 更新Dashboard的统计卡片
        // 总测验数量
        document.querySelector(
          "#dashboard-overview .card:nth-child(1) h3"
        ).textContent = responseData.total || 0;

        // 上次活动时间
        if (quizItems && quizItems.length > 0) {
          const lastActivity = formatTimeAgo(new Date(quizItems[0].created_at));
          document.querySelector(
            "#dashboard-overview .card:nth-child(2) h3"
          ).textContent = lastActivity;
        } else {
          document.querySelector(
            "#dashboard-overview .card:nth-child(2) h3"
          ).textContent = "No activity";
        }

        // 收藏数量（统计is_favorite为true的项目）
        const favoriteCount = quizItems.filter(
          (item) => item.is_favorite
        ).length;
        document.querySelector(
          "#dashboard-overview .card:nth-child(3) h3"
        ).textContent = favoriteCount;

        // 更新Recent Activity列表
        const recentActivityList = document.querySelector(
          "#dashboard-overview .list-group"
        );
        recentActivityList.innerHTML = "";

        // 添加最多3条近期活动
        if (quizItems && quizItems.length > 0) {
          quizItems.forEach((item) => {
            // 格式化创建时间
            const createdDate = new Date(item.created_at);
            const timeAgo = formatTimeAgo(createdDate);

            // 解析问题类型
            let questionTypes = [];
            try {
              questionTypes = JSON.parse(item.question_types);
            } catch (e) {
              console.error("Error parsing question types:", e);
              questionTypes = ["Multiple Choice"];
            }

            // 创建历史记录HTML
            const historyItemHTML = `
            <div class="list-group-item list-group-item-action" data-quiz-id="${
              item.id
            }">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${item.grade_level} ${item.subject} ${
              item.make_comprehensive_test ? "Comprehensive Test" : "Quiz"
            }</h5>
                <small>${timeAgo}</small>
              </div>
              <p class="mb-1">
                ${
                  item.make_comprehensive_test
                    ? "Comprehensive test with"
                    : `Generated a ${item.number_of_questions}-question quiz with`
                } 
                ${questionTypes.join(" and ")} questions.
              </p>
              <div>
                <span class="badge bg-primary">${item.grade_level}</span>
                <span class="badge bg-info">${item.subject}</span>
                ${
                  item.is_favorite
                    ? '<span class="badge bg-warning"><i class="fas fa-star me-1"></i>Favorite</span>'
                    : ""
                }
              </div>
            </div>
          `;

            recentActivityList.innerHTML += historyItemHTML;
          });

          // 添加点击事件，允许从Recent Activity直接查看测验
          const activityItems =
            recentActivityList.querySelectorAll(".list-group-item");
          activityItems.forEach((item) => {
            item.addEventListener("click", function () {
              const quizId = this.getAttribute("data-quiz-id");
              viewQuiz(quizId);
            });
          });
        } else {
          // 如果没有历史记录
          recentActivityList.innerHTML = `
          <div class="text-center py-4">
            <i class="fas fa-history text-muted mb-3" style="font-size: 2rem"></i>
            <p>No recent activity found</p>
            <button class="btn btn-primary" id="create-first-quiz">Create Your First Quiz</button>
          </div>
        `;

          // 添加创建按钮事件
          document
            .getElementById("create-first-quiz")
            .addEventListener("click", goToGenerator);
        }
      } else if (result.status === 401) {
        // 令牌过期，尝试刷新
        refreshTokenAndRetry(updateRecentActivity);
      }
    })
    .catch((error) => {
      console.error("Failed to fetch recent activities:", error);
    });
}

// 时间格式化辅助函数
function formatTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
  }

  // 超过一周显示具体日期
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// 提取HTML内容中的纯文本预览
function extractPreview(html, maxLength = 100) {
  if (!html) return '';
  
  // 创建临时元素并设置HTML内容
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // 提取纯文本
  let text = tempDiv.textContent || tempDiv.innerText || '';
  
  // 移除多余空格和换行
  text = text.replace(/\s+/g, ' ').trim();
  
  // 截断长文本
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }
  
  return text;
}

// 在文档加载完成后执行
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard Recent Activity JS loaded");

  // 等待一小段时间确保主脚本已经加载
  setTimeout(function () {
    // 检查原始函数是否存在
    if (typeof window.switchDashboardTab === "function") {
      try {
        // 保存原始函数
        const originalSwitchDashboardTab = window.switchDashboardTab;

        // 重新定义函数
        window.switchDashboardTab = function (e) {
          // 调用原始函数
          originalSwitchDashboardTab.call(this, e);

          // 获取标签页ID
          const tabId = e.target.getAttribute("data-tab");

          // 如果切换到Dashboard概览，加载Recent Activity
          if (tabId === "dashboard-overview") {
            console.log("Loading Recent Activity data...");
            updateRecentActivity();
          }
        };

        console.log("Dashboard tab switcher enhanced");

        // 如果当前在dashboard-overview页面，初始化Recent Activity
        if (
          window.location.hash === "#dashboard" &&
          document.querySelector(
            '.nav-link[data-tab="dashboard-overview"].active'
          )
        ) {
          console.log("Initial loading of Recent Activity...");
          updateRecentActivity();
        }
      } catch (error) {
        console.error("Error when enhancing dashboard tab switcher:", error);
      }
    } else {
      console.warn(
        "switchDashboardTab function not found, Recent Activity may not work properly"
      );
    }
  }, 500); // 等待500ms确保主脚本已加载
});
