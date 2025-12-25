// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- 封装用户注册命令 --
Cypress.Commands.add("register", (username, password) => {
  cy.visit("/register"); // 跳转到注册页（确保你的路由是 /register）
  
  // 输入用户名（替换为你项目中实际的 placeholder/name/class）
  cy.get('input[placeholder="请输入用户名"]').type(username);
  
  // 输入密码（适配密码输入框的 placeholder）
  cy.get('input[placeholder="请输入密码（至少6位）"]').type(password);
  
  // 选择性别（若你的性别选择器不是 select[name="gender"]，需替换）
  cy.get('select[name="gender"]').select("男");
  
  // 选择星座（若你的星座选择器不是 select[name="constellation"]，需替换）
  cy.get('select[name="constellation"]').select("白羊座");
  
  // 点击注册按钮（按文字匹配，若按钮文字是“提交注册”需修改）
  cy.get('button:contains("注册")').click();
  
  // 验证注册成功提示（加 timeout 兼容提示框延迟显示）
  cy.get('.el-message:contains("注册成功")', { timeout: 5000 }).should("be.visible");
});

// -- 封装用户登录命令 --
Cypress.Commands.add("login", (username, password) => {
  cy.visit("/login"); // 跳转到登录页（确保路由是 /login）
  
  cy.get('input[placeholder="请输入用户名"]').type(username);
  cy.get('input[placeholder="请输入密码"]').type(password);
  
  cy.get('button:contains("登录")').click();
  
  // 验证登录成功提示（兼容延迟）
  cy.get('.el-message:contains("登录成功")', { timeout: 5000 }).should("be.visible");
});
