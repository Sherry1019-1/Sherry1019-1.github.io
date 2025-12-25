// 24h情绪便利店 全功能自动化测试脚本（最终修复版）
describe("24h情绪便利店 - 全功能测试套件", () => {
  beforeEach(() => {
    cy.visit("/emotion.html");
    cy.clearLocalStorage();
    cy.wait(5000);
    cy.title().should("eq", "24h情绪便利店");
  });

  // 修复1：处理表情符号+文本的匹配问题
  it("TC001 - 心情便签：游客可正常添加并存储心情", () => {
    cy.get(".mood-Record1").should("be.visible").click({ force: true });
    cy.wait(1000);

    const selectedEmojiIndex = 2;
    cy.get(".E-emoji").eq(selectedEmojiIndex).click();

    // 纯文本输入
    const moodText = "测试心情";
    cy.get("textarea.talk").type(moodText);

    cy.get("#btn1").click();

    // 修复：忽略表情符号，只验证文本部分
    cy.window().then((win) => {
      const emotionData = JSON.parse(win.localStorage.getItem("emotion_guest") || "[]");
      expect(emotionData.length).to.equal(1);
      // 用includes替代equal，兼容表情+文本的场景
      expect(emotionData[0].text).to.include(moodText);
    });
  });

  it("TC002 - 树洞功能：游客可提交心事并查看回复", () => {
    cy.get(".mood-Record4").click({ force: true });
    cy.wait(1000);

    const treeHoleText = "测试树洞";
    cy.get(".message-input").type(treeHoleText);
    cy.get(".submit-btn").click();

    cy.get(".your-message").contains(treeHoleText);
    cy.get(".reply-area").should("be.visible");
  });

  it("TC003 - MBTI测试：可正常答题并记录选择", () => {
    cy.get(".mood-Record2").click({ force: true });
    cy.wait(1500);

    const answers = ["A", "B", "A"];
    answers.forEach((answer, index) => {
      cy.get(`.BtnYN:eq(${index}) .btn_${answer}`).click();
      cy.wait(500);
    });

    cy.get(".BtnYN:eq(0) .btn_A").should("have.class", "selected");
  });

  it("TC004 - 边界测试：空内容提交应给出提示", () => {
    cy.get(".mood-Record1").click();
    cy.wait(1000);

    cy.get("#btn1").click();
    // 捕获alert提示（适配实际场景）
    cy.on("window:alert", (text) => {
      expect(text).to.include("请输入");
    });
  });

  // 修复2：彻底重构后置操作（移除错误的catch语法）
  afterEach(() => {
    cy.clearLocalStorage();
    // 方案：先判断元素是否存在，再操作（Cypress推荐写法）
    cy.get("body").then(($body) => {
      // 检查页面是否有返回主页按钮
      if ($body.find(".back-home-btn").length > 0) {
        cy.get(".back-home-btn").click({ force: true });
      } else {
        cy.log("未找到返回主页按钮，跳过");
      }
    });
  });
});