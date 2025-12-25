const { createApp } = Vue;
createApp({ 
  data() {
    return {
      // ===== 1. 页面状态 =====
      page: 'home',
      isHovering: false,
      
      // ===== 2. 心情便签数据 =====
      diaryInput: '',
      inputValue: '',
      selectedEmj: '',
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(), // 0-11
      showRecordModal: false,
      modalDate: '',
      modalRecords: [],
      moodRecords: [],
      
      // ===== 3. MBTI测试数据 =====
      questions: [
        // 一、外向 vs 内向维度（1-15题）
        { q: '1.参加聚会时，你更享受：', opts: ['主动和不同的人聊天、成为焦点', '和熟悉的人小范围交流，或安静观察'] },
        { q: '2.完成重要任务后，你会通过什么恢复精力：', opts: ['和朋友出门玩/参加活动', '独处（看书、追剧、发呆）'] },
        { q: '3.你更擅长：', opts: ['即兴发言、现场表达想法', '提前准备好内容后再沟通'] },
        { q: '4.你对"社交"的看法更接近：', opts: ['能带来能量和新鲜感', '会消耗精力，需要"充电"'] },
        { q: '5.朋友评价你更像：', opts: ['话多、热情、容易熟络', '慢热、话少、需要时间熟悉'] },
        { q: '6.遇到问题时，你习惯：', opts: ['先和他人讨论，再做决定', '先自己思考清楚，再和他人说'] },
        { q: '7.你更愿意参与：', opts: ['多人团队项目，一起头脑风暴', '独立负责的任务，自主安排节奏'] },
        { q: '8.闲聊时，你通常：', opts: ['主动开启话题，能聊各种内容', '等别人开启话题，只聊感兴趣的'] },
        { q: '9.你对新环境的适应速度：', opts: ['很快，能快速融入', '较慢，需要时间熟悉'] },
        { q: '10.你更在意"当下的氛围"还是"自己的内心感受"：', opts: ['当下的氛围（让周围人舒服）', '自己的内心感受（不勉强自己）'] },
        { q: '11.你更倾向于：', opts: ['边说边想，通过交流梳理思路', '想清楚后再说，避免表达混乱'] },
        { q: '12.周末有空时，你更可能：', opts: ['约朋友出门（吃饭、逛街、运动）', '宅在家里做自己的事'] },
        { q: '13.你在社交中更关注：', opts: ['对方的反应和互动节奏', '自己想表达的内容是否清晰'] },
        { q: '14.你觉得"认识新朋友"是：', opts: ['有趣的事，愿意主动拓展人脉', '有压力的事，除非必要否则不做'] },
        { q: '15.团队讨论时，你通常是：', opts: ['积极发言、带动讨论的人', '认真倾听、偶尔补充的人'] },

        // 二、感觉 vs 直觉维度（16-30题）
        { q: '16.你更擅长记住：', opts: ['具体的细节（比如数字、日期、外貌）', '整体的感觉、逻辑或抽象的概念'] },
        { q: '17.你做决定时更依赖：', opts: ['已有的经验、实际的证据', '直觉、灵感或对未来的预判'] },
        { q: '18.看电影时，你更关注：', opts: ['剧情的细节、演员的台词和动作', '剧情的隐喻、主题和深层含义'] },
        { q: '19.你更擅长：', opts: ['按步骤完成具体任务（比如组装物品、整理数据）', '跳出框架想新方法（比如优化流程、创意构思）'] },
        { q: '20.你对"新事物"的关注重点是：', opts: ['它的实际用途、怎么操作', '它的可能性、能带来什么变化'] },
        { q: '21.你描述一件事时，更倾向于：', opts: ['说清楚时间、地点、具体经过', '说清楚这件事的意义、感受或影响'] },
        { q: '22.你学习新技能时，更习惯：', opts: ['跟着教程一步步做，先掌握操作', '先了解整体逻辑，再尝试自己摸索'] },
        { q: '23.你更在意信息的：', opts: ['准确性、真实性', '启发性、创新性'] },
        { q: '24.你看到"一杯水"时，第一反应是：', opts: ['杯子的材质、水的温度、还有多少量', '这杯水的故事（谁倒的、用来做什么、象征什么）'] },
        { q: '25.你更擅长发现：', opts: ['细节中的错误（比如错别字、数据偏差）', '趋势中的规律（比如事物的发展方向）'] },
        { q: '26.你更相信：', opts: ['亲眼看到、亲身体验过的事', '逻辑推导、直觉判断的事'] },
        { q: '27.你规划旅行时，更倾向于：', opts: ['详细安排每天的行程、交通、住宿', '只定大致方向，到了再随机探索'] },
        { q: '28.你对"说明书"的态度是：', opts: ['会仔细看，严格按说明操作', '大概看一眼，更喜欢自己尝试'] },
        { q: '29.你更擅长：', opts: ['描述具体的事实（比如"这个苹果是红色的，重100克"）', '描述抽象的感受（比如"这个苹果给人温暖、甜美的感觉"）'] },
        { q: '30.你解决问题时，更先考虑：', opts: ['"现在有什么资源可以用"', '"如果这样做，未来会有什么结果"'] },

        // 三、思考 vs 情感维度（31-45题）
        { q: '31.朋友和人吵架找你倾诉，你更可能：', opts: ['帮他分析对错、提出解决办法', '先安抚他的情绪，说"我懂你的感受"'] },
        { q: '32.你做决定时，更看重：', opts: ['公平、逻辑、是否合理', '他人的感受、是否和谐'] },
        { q: '33.你被批评时，更在意：', opts: ['批评的内容是否客观、有道理', '批评的语气是否伤人、对方是否讨厌自己'] },
        { q: '34.你评价他人时，更倾向于：', opts: ['说"他能力很强、做事很高效"', '说"他很温柔、对人很友善"'] },
        { q: '35.团队合作中，你更在意：', opts: ['任务是否按时完成、质量是否达标', '团队氛围是否融洽、大家是否开心'] },
        { q: '36.你拒绝别人时，更可能：', opts: ['直接说"不行，因为XX原因"', '委婉说"不好意思，我可能不太方便"，怕对方难过'] },
        { q: '37.你认为"公平"是：', opts: ['对所有人都按同一标准对待', '对不同的人根据情况灵活调整'] },
        { q: '38.你更擅长：', opts: ['理性分析问题，不带情绪', '感知他人的情绪，照顾他人感受'] },
        { q: '39.你看到不公平的事，更可能：', opts: ['站出来指出问题，要求按规则来', '先安抚受影响的人，再想办法调和'] },
        { q: '40.你做选择时，更可能：', opts: ['列优缺点清单，选最优解', '跟着"心里的感觉"选，看哪个更舒服'] },
        { q: '41.你更在意自己的：', opts: ['能力、成就', '人际关系、受欢迎程度'] },
        { q: '42.你和他人发生分歧时，更倾向于：', opts: ['辩论对错，直到说服对方', '妥协让步，避免冲突升级'] },
        { q: '43.你觉得"成熟"是：', opts: ['能理性控制情绪、客观处理问题', '能理解他人、照顾他人的感受'] },
        { q: '44.你更不喜欢：', opts: ['做事没逻辑、效率低的人', '冷漠、不考虑他人感受的人'] },
        { q: '45.你收到礼物时，更关注：', opts: ['礼物的实用性、价值', '对方的心意、是否花了心思'] },

        // 四、判断 vs 知觉维度（46-60题）
        { q: '46.你更喜欢：', opts: ['提前规划好日程，按计划进行', '灵活安排时间，想到什么做什么'] },
        { q: '47.你看到桌面很乱时，更可能：', opts: ['立刻整理干净，否则不舒服', '觉得"乱中有序"，等需要时再整理'] },
        { q: '48.你做任务时，更倾向于：', opts: ['先完成任务，再放松休息', '先放松一会儿，再慢慢做任务'] },
        { q: '49.你对"截止日期"的态度是：', opts: ['提前几天完成，避免拖延', '截止前一天/当天才完成，觉得效率更高'] },
        { q: '50.你旅行时，更享受：', opts: ['按计划打卡所有景点，不浪费时间', '随机探索，遇到有趣的事就多停留'] },
        { q: '51.你更擅长：', opts: ['制定计划、组织活动', '随机应变、处理突发情况'] },
        { q: '52.你周末的安排通常是：', opts: ['周五就想好周末要做什么', '周末早上醒来再决定'] },
        { q: '53.你更在意：', opts: ['事情是否有"结果""定论"', '事情是否有"可能性""变化空间"'] },
        { q: '54.你遇到临时变动时，更可能：', opts: ['觉得烦躁，因为打乱了计划', '觉得新鲜，愿意尝试新安排'] },
        { q: '55.你整理物品时，更倾向于：', opts: ['分类收纳，有固定的位置', '随意摆放，方便拿取即可'] },
        { q: '56.你更喜欢的工作方式是：', opts: ['有明确的流程、固定的职责', '灵活的任务、可以自主调整'] },
        { q: '57.你做选择时，更希望：', opts: ['尽快确定，避免纠结', '多对比选项，不着急做决定'] },
        { q: '58.你对"完美"的理解是：', opts: ['所有细节都按计划完成', '保留一些弹性，接受不完美'] },
        { q: '59.你更不喜欢：', opts: ['计划被打乱、失控的感觉', '被规则束缚、没有自由的感觉'] },
        { q: '60.你结束一天时，更希望：', opts: ['完成了当天的所有计划', '做了一些有趣的、意外的事'] }
      ],
      userAnswers: new Array(60).fill(null),
      mbtiResult: null,
      
      // ===== 4. 星座解析数据 =====
      zodiacSigns: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
      signDates: {
        '白羊座': '3.21-4.19', '金牛座': '4.20-5.20', '双子座': '5.21-6.21', '巨蟹座': '6.22-7.22',
        '狮子座': '7.23-8.22', '处女座': '8.23-9.22', '天秤座': '9.23-10.23', '天蝎座': '10.24-11.22',
        '射手座': '11.23-12.21', '摩羯座': '12.22-1.19', '水瓶座': '1.20-2.18', '双鱼座': '2.19-3.20'
      },
      selectedSign: '',
      horoscopeData: {
        '白羊座': {
          keyword: '勇敢的开拓者', dateRange: '3月21日-4月19日', element: '火象星座', rulingPlanet: '火星',
          personality: {
            strengths: '热情、勇敢、直率、行动力强、充满活力、富有正义感',
            weaknesses: '急躁、冲动、缺乏耐心、容易发怒、考虑不周',
            detail: '白羊座是黄道第一宫，代表着新生和开始。你们像战士一样勇往直前，讨厌复杂和拐弯抹角。内心永远住着一个孩子，保有纯真和直接。你们的勇气是最大财富，但也需学会三思而后行。'
          },
          love: {
            style: '热烈而直接',
            compatibility: '与狮子座、射手座最配，与巨蟹座、摩羯座需要磨合',
            advice: '在感情中要学会倾听和放慢节奏，直率是优点，但也要顾及对方的感受。表达爱意时不妨加些浪漫的小心思。'
          },
          career: {
            aptitudes: '创业、销售、运动员、军人、外科医生',
            advice: '适合需要冲劲和开创精神的工作。团队中可担任先锋角色，但需学会与细致型同事合作。避免需要长期耐心的重复性工作。'
          },
          health: { focus: '头部、面部、大脑', tips: '容易有头痛、偏头痛问题。注意控制脾气，避免情绪激动。规律运动能消耗过剩精力，建议练习瑜伽来平衡急躁性格。' }
        },
        '金牛座': {
          keyword: '稳健的建造者', dateRange: '4月20日-5月20日', element: '土象星座', rulingPlanet: '金星',
          personality: {
            strengths: '稳重、可靠、有耐心、务实、审美力强、忠诚',
            weaknesses: '固执、保守、物质主义、反应较慢、不喜欢变化',
            detail: '金牛座代表着稳定和积累。你们像大地一样可靠，重视安全和舒适。拥有出色的感官和审美，懂得享受生活。变化对你们来说是挑战，需要时间来适应新环境。'
          },
          love: {
            style: '慢热而持久',
            compatibility: '与处女座、摩羯座最配，与水瓶座、狮子座需要磨合',
            advice: '感情中需要时间和耐心来建立信任。一旦认定就会非常忠诚。学会偶尔制造浪漫惊喜，避免让关系变得过于平淡。'
          },
          career: {
            aptitudes: '金融、艺术、餐饮、建筑、园艺',
            advice: '适合需要耐心和持久力的工作。在财务、艺术领域能发挥天赋。工作中需要明确的目标和稳定的回报。'
          },
          health: { focus: '颈部、喉咙、甲状腺', tips: '注意喉咙保养，少吃刺激性食物。容易因压力导致颈部僵硬。定期按摩和温和运动有助于放松。控制甜食摄入。' }
        },
        '双子座': {
          keyword: '灵活的沟通者', dateRange: '5月21日-6月21日', element: '风象星座', rulingPlanet: '水星',
          personality: {
            strengths: '聪明、好奇、善于沟通、适应力强、多才多艺',
            weaknesses: '善变、注意力分散、缺乏深度、容易焦虑、表面化',
            detail: '双子座代表着沟通和信息。你们像风一样自由流动，对新事物充满好奇。拥有双重性格，能在不同场合展现不同面貌。需要不断的精神刺激来保持活力。'
          },
          love: {
            style: '灵动而多变',
            compatibility: '与天秤座、水瓶座最配，与处女座、双鱼座需要磨合',
            advice: '感情中需要智性交流和新鲜感。容易因无聊而失去兴趣。寻找能和你一起探索世界的伴侣，同时也要学会专注和深入。'
          },
          career: {
            aptitudes: '媒体、写作、教育、销售、公关',
            advice: '适合需要沟通和灵活性的工作。能同时处理多项任务。避免过于单调重复的工作环境，需要变化和挑战。'
          },
          health: { focus: '手部、手臂、神经系统', tips: '注意手部保养，避免过度使用。神经系统较敏感，需要学会放松技巧。规律作息对你们很重要，避免咖啡因过量。' }
        },
        '巨蟹座': {
          keyword: '温柔的守护者', dateRange: '6月22日-7月22日', element: '水象星座', rulingPlanet: '月亮',
          personality: {
            strengths: '体贴、保护欲强、直觉敏锐、记忆力好、富有同情心',
            weaknesses: '情绪化、过度敏感、依赖性强、喜欢抱怨、记仇',
            detail: '巨蟹座代表着家庭和情感。你们像月亮一样温柔，情感丰富而深刻。拥有很强的直觉和自我保护意识。家是你们的避风港，重视传统和安全感。'
          },
          love: {
            style: '深情而依赖',
            compatibility: '与天蝎座、双鱼座最配，与白羊座、天秤座需要磨合',
            advice: '在感情中需要大量安全感和承诺。容易因小事受伤。学会表达需求而不是被动等待，也要给对方独立空间。'
          },
          career: {
            aptitudes: '护理、教育、心理咨询、餐饮、房地产',
            advice: '适合需要关怀和耐心的工作。能创造温暖的工作环境。避免高压和冷漠的竞争环境，需要情感认同。'
          },
          health: { focus: '胸部、胃部、消化系统', tips: '情绪直接影响消化系统。注意饮食规律，避免情绪化进食。泡热水澡和冥想有助于情绪平衡。' }
        },
        '狮子座': {
          keyword: '耀眼的领导者', dateRange: '7月23日-8月22日', element: '火象星座', rulingPlanet: '太阳',
          personality: {
            strengths: '自信、慷慨、有领导力、热情、富有创造力',
            weaknesses: '傲慢、自负、需要被关注、不容质疑、挥霍',
            detail: '狮子座代表着自我表达和创造力。你们像太阳一样闪耀，天生具有领导气质。渴望被认可和赞美，内心充满骄傲。慷慨大方，但对尊重有极高要求。'
          },
          love: {
            style: '热烈而忠诚',
            compatibility: '与白羊座、射手座最配，与金牛座、天蝎座需要磨合',
            advice: '在感情中需要被崇拜和关注。表达爱意时大胆而浪漫。学会适当示弱和倾听，爱情是相互的舞台。'
          },
          career: {
            aptitudes: '管理、演艺、设计、教育、创业',
            advice: '适合能展现领导才能和创造力的工作。需要舞台和认可。团队中适合担任核心角色，但需学会欣赏他人贡献。'
          },
          health: { focus: '心脏、背部、脊柱', tips: '注意心脏健康，避免过度劳累和情绪激动。背部容易紧张，定期拉伸很重要。适度运动而非过度消耗。' }
        },
        '处女座': {
          keyword: '完美的分析师', dateRange: '8月23日-9月22日', element: '土象星座', rulingPlanet: '水星',
          personality: {
            strengths: '细心、有条理、善于分析、务实、乐于助人',
            weaknesses: '挑剔、完美主义、过度担忧、批评倾向、缺乏弹性',
            detail: '处女座代表着服务和改进。你们像工匠一样追求完美，注重细节和效率。拥有强大的分析能力和服务精神，但容易陷入自我批评。通过帮助他人来获得满足感。'
          },
          love: {
            style: '谨慎而付出',
            compatibility: '与金牛座、摩羯座最配，与双子座、射手座需要磨合',
            advice: '在感情中需要秩序和可靠性。容易因小瑕疵而纠结。学会接受不完美，表达关心而不仅仅是批评。'
          },
          career: {
            aptitudes: '会计、编辑、研究、医疗、质量管理',
            advice: '适合需要精确和条理的工作。是优秀的执行者和改进者。避免过于混乱的环境，需要清晰的标准和流程。'
          },
          health: { focus: '肠道、神经系统', tips: '肠道健康与压力直接相关。注意饮食卫生和规律。练习放松技巧，避免过度焦虑影响消化。' }
        },
        '天秤座': {
          keyword: '优雅的调和者', dateRange: '9月23日-10月23日', element: '风象星座', rulingPlanet: '金星',
          personality: {
            strengths: '优雅、公正、善于社交、有魅力、追求和谐',
            weaknesses: '犹豫不决、回避冲突、依赖他人、表面化、虚荣',
            detail: '天秤座代表着平衡和关系。你们像天平一样追求公正与和谐，拥有出色的社交技巧和审美。讨厌冲突和不公，但有时为了和平而压抑真实感受。'
          },
          love: {
            style: '浪漫而平衡',
            compatibility: '与双子座、水瓶座最配，与巨蟹座、摩羯座需要磨合',
            advice: '在感情中追求完美的伴侣关系。容易为维持和谐而妥协过多。学会表达真实想法，健康的关系需要真诚的沟通。'
          },
          career: {
            aptitudes: '法律、外交、设计、公关、咨询',
            advice: '适合需要协调和美感的工作。能创造和谐的工作环境。决策时需要给自己设定期限，避免过度犹豫。'
          },
          health: { focus: '腰部、肾脏', tips: '注意腰部保养，避免久坐。肾脏需要充足水分。压力和决策困难可能反映在身体上，学会做决定后放下。' }
        },
        '天蝎座': {
          keyword: '深邃的探索者', dateRange: '10月24日-11月22日', element: '水象星座', rulingPlanet: '冥王星、火星',
          personality: {
            strengths: '深刻、敏锐、意志坚定、有洞察力、忠诚',
            weaknesses: '多疑、记仇、控制欲强、极端、不轻易信任',
            detail: '天蝎座代表着深度和转化。你们像深海一样神秘而强大，拥有穿透表象的洞察力。情感强烈而深刻，不轻易表露内心。重视忠诚和真实，讨厌肤浅。'
          },
          love: {
            style: '深刻而专注',
            compatibility: '与巨蟹座、双鱼座最配，与狮子座、水瓶座需要磨合',
            advice: '在感情中需要绝对的忠诚和深度连接。占有欲和控制欲需要适度管理。学会适当展现脆弱，信任是相互的。'
          },
          career: {
            aptitudes: '研究、侦探、心理学、金融、外科医生',
            advice: '适合需要深度分析和保密的工作。能处理危机和复杂情况。避免需要表面社交的工作，需要实质性的挑战。'
          },
          health: { focus: '生殖系统、排泄系统', tips: '注意定期体检。情绪压抑容易影响健康。找到安全的情绪出口，如写作或深度对话。' }
        },
        '射手座': {
          keyword: '自由的探险家', dateRange: '11月23日-12月21日', element: '火象星座', rulingPlanet: '木星',
          personality: {
            strengths: '乐观、坦率、热爱自由、有哲理、适应力强',
            weaknesses: '不负责任、直言伤人、缺乏耐心、承诺困难',
            detail: '射手座代表着探索和扩张。你们像箭一样指向远方，渴望知识和体验。乐观开朗，讨厌束缚和琐碎。哲学思维让你们看到更大的图景。'
          },
          love: {
            style: '自由而坦诚',
            compatibility: '与白羊座、狮子座最配，与处女座、双鱼座需要磨合',
            advice: '在感情中需要空间和成长。容易因承诺而紧张。寻找能一起冒险的伴侣，同时也要学会扎根和持续投入。'
          },
          career: {
            aptitudes: '教育、旅行、出版、哲学、户外运动',
            advice: '适合需要自由和变化的工作。能传播理念和激励他人。避免重复性高、限制多的工作环境。'
          },
          health: { focus: '臀部、大腿、肝脏', tips: '需要规律运动释放能量。注意饮食适度，避免过度饮酒。长途旅行时注意腿部循环。' }
        },
        '摩羯座': {
          keyword: '坚毅的攀登者', dateRange: '12月22日-1月19日', element: '土象星座', rulingPlanet: '土星',
          personality: {
            strengths: '负责、自律、务实、有野心、坚韧',
            weaknesses: '悲观、保守、工作狂、情感压抑、过度严肃',
            detail: '摩羯座代表着成就和结构。你们像山羊一样稳步攀登，重视责任和成就。务实而自律，相信努力终有回报。情感表达较为保守，但内在深刻。'
          },
          love: {
            style: '稳重而承诺',
            compatibility: '与金牛座、处女座最配，与巨蟹座、白羊座需要磨合',
            advice: '在感情中需要稳定和承诺。表达爱意通过行动而非言语。学会放松和享受当下，而不仅仅是计划和未来。'
          },
          career: {
            aptitudes: '管理、金融、工程、政治、科学研究',
            advice: '适合需要纪律和长期规划的工作。是优秀的组织者和执行者。避免过于随性无序的环境，需要明确的目标和结构。'
          },
          health: { focus: '骨骼、牙齿、皮肤', tips: '注意钙质补充和骨骼健康。工作压力容易导致肌肉紧张。定期放松和适度娱乐很重要。' }
        },
        '水瓶座': {
          keyword: '前卫的改革者', dateRange: '1月20日-2月18日', element: '风象星座', rulingPlanet: '天王星、土星',
          personality: {
            strengths: '创新、独立、人道主义、聪明、开放',
            weaknesses: '疏离、固执、情绪冷淡、反叛、难以预测',
            detail: '水瓶座代表着革新和未来。你们像电流一样独特，思想超前而独立。重视自由和理想，有时显得疏离。人道主义精神让你们关心群体而非个体。'
          },
          love: {
            style: '独立而友谊式',
            compatibility: '与双子座、天秤座最配，与金牛座、天蝎座需要磨合',
            advice: '在感情中需要智性连接和独立空间。容易将关系朋友化。学会表达情感和需求，而不仅仅是理念和想法。'
          },
          career: {
            aptitudes: '科技、创新、社会改革、天文学、心理学',
            advice: '适合需要创意和前瞻性的工作。能带来全新视角和改革。避免传统保守的环境，需要发挥创意的空间。'
          },
          health: { focus: '脚踝、血液循环', tips: '注意脚踝保护。久坐影响血液循环，需要定期活动。保持社交连接有益情绪健康。' }
        },
        '双鱼座': {
          keyword: '梦幻的共情者', dateRange: '2月19日-3月20日', element: '水象星座', rulingPlanet: '海王星、木星',
          personality: {
            strengths: '慈悲、直觉、艺术感、适应力、富有想象力',
            weaknesses: '逃避现实、边界模糊、容易受害、缺乏方向、过度敏感',
            detail: '双鱼座代表着灵性和融合。你们像海洋一样包容，感受力极强。富有艺术灵感和同情心，但容易失去自我边界。在现实和梦想之间游走。'
          },
          love: {
            style: '浪漫而牺牲',
            compatibility: '与巨蟹座、天蝎座最配，与双子座、射手座需要磨合',
            advice: '在感情中容易理想化和牺牲自我。需要学会设立边界。寻找能理解你深度情感的伴侣，同时也要保持现实基础。'
          },
          career: {
            aptitudes: '艺术、音乐、心理学、灵性指导、慈善',
            advice: '适合需要创意和同情心的工作。能理解和帮助他人。避免过于理性和竞争的环境，需要表达情感的空间。'
          },
          health: { focus: '脚部、淋巴系统', tips: '注意脚部护理。容易吸收他人情绪，需要定期"能量清理"。创造安静独处的时间来恢复。' }
        }
      },
  
    // ===== 树洞数据 =====
    treeholeMessage: '',
    treeholeReply: '',
    submitted: false,
    submitting: false,
    treeholeHistory: [],
    isPublic: false,
    lastConfessionPublic: false,
    lastConfessionMessage: '',
    
    // 公开心事数据
    publicConfessions: [],
    showConfessionDetail: false,
    currentDetail: null,
    newCommentText: '',
    
    // 树洞历史展开状态
    expandedTH: new Set(),
    
      // ===== 6. 用户系统数据 =====
      currentUser: null,
      showLoginModal: false,
      showRegisterModal: false,
      loginForm: { username: '', password: '' },
      expandedMood: new Set(),
      registerForm: {
        username: '',
        password: '',
        avatar: '',
        avatarFile: null,
        gender: '',
        zodiac: '',
        mbti: '',
      },
      
      // ===== 7. 静态数据 =====
      wordslist: [
        "亲爱的不要觉得别人发光你就黯淡",
        "可以脆弱，可以是不完美的",
        "黑夜在离开了，阳光洒进来了！",
        "你已经做得很好了，真的不用对自己那么严格。",
        "你的努力我都看在眼里，你真的超棒的。",
        "你值得被好好对待，包括被自己温柔对待。",
        "不用急着解决所有问题，先让自己舒服一点更重要。",
        "这件事确实很难，你能撑到现在已经很厉害了。",
        "你身上有很多闪光点，只是你自己没发现而已。",
        "你的存在本身就很有意义，不用做什么来证明。",
        "今天没精神也没关系，明天又是新的一天呀。",
        "别纠结过去啦，往前看，会有好事的。",
        "你对别人那么好，也要记得对自己好一点呀",
        "风停在窗边嘱咐你要热爱这个世界",
        "你总是惯着别人偶尔也顺从一下自己吧",
        "好的总是压箱底 我猜幸福也是",
        "祝好 在数不尽的明天",
        "靠近阳光里 什么也不用想",
        "人生不止一个方向",
        "为热烈的喜欢而有意义",
        "亲爱的 你可以为打翻的牛奶哭泣 那是你完整的情绪.",
        "主角都是怎么开心怎么来",
        "你现在的感受特别正常，换作是我也会这样。",
        "不开心时，记得找我哦，我们一起吃甜品，聊聊心事",
        "我也愿意做你的头号支持者",
      ],
      emoji: [
        "😄", "😅", "🙂", "🤩", "🥰", "😋", "🤔", "🤐", "😑", "😏", "😒", "🙄", "🫨", "😔", "😴", 
        "🫩", "😪", "😷", "🤒", "🤕", "🤢", "🤮", "😵‍💫", "🥳", "😮", "😱", "😭", "🥹", "😨", "😤", 
        "🤬", "🤡", "💩", "💘", "💔", "😘"
      ]
    }
  },
  
  computed: {
    // ===== 1. 日历相关计算属性 =====
    currentMonthText() {
      return `${this.currentYear}年${this.currentMonth + 1}月`;
    },
    displayDates() {
      const { currentYear, currentMonth } = this;
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
      const startWeekday = firstDay.getDay();
      const totalDays = lastDay.getDate();

      const dates = [];

      // 前面补空格
      for (let i = 0; i < startWeekday; i++) {
        dates.push({ day: null, records: [] });
      }

      // 添加每一天
      for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const recordsForDay = this.moodRecords.filter(record => {
          const recordDate = new Date(record.time);
          const recordStr = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}-${String(recordDate.getDate()).padStart(2, '0')}`;
          return recordStr === dateStr;
        });

        dates.push({
          day,
          date: dateStr,
          isToday: this.isToday(currentYear, currentMonth, day),
          records: recordsForDay
        });
      }

      return dates;
    },
    
    // ===== 2. 星座相关计算属性 =====
    currentHoroscope() {
      return this.horoscopeData[this.selectedSign] || {};
    },
    
    // ===== 3. 弹幕相关计算属性 =====
    rows() {
      const rowNum = 4;
      const result = Array.from({ length: rowNum }, () => []);
      this.wordslist.forEach((word, i) => {
        result[i % rowNum].push(word);
      });
      return result;
    },
    
    // ===== 4. 数据格式化计算属性 =====
    formattedRecords() {
      return this.moodRecords.slice().reverse().map(r => ({
        ...r,
        date: new Date(r.time).toLocaleString('zh-CN')
      }));
    },
    formattedTreeholeHistory() {
      return this.treeholeHistory.slice().reverse().map(t => ({
        ...t,
        date: new Date(t.time).toLocaleString('zh-CN')
      }));
    },
    
    // ===== 5. 树洞相关计算属性 =====
     // 获取公开心事（按时间倒序）
  sortedPublicConfessions() {
    return [...this.publicConfessions].sort((a, b) => b.time - a.time);
  },
  
  // 获取热门心事（按点赞数排序）
  popularConfessions() {
    return [...this.publicConfessions]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, 10);
  },
  
  // 格式化树洞历史记录
  formattedTreeholeHistory() {
    return this.treeholeHistory.slice().reverse().map(t => ({
      ...t,
      date: new Date(t.time).toLocaleString('zh-CN')
    }));
  }
},
  
  methods: {
    // ===== 1. 心情便签方法 =====
    selectEmj(emojis) {
      this.selectedEmj = emojis;
      this.inputValue = emojis;
    },
    
    recieve() {
      if (!this.inputValue.trim()) return alert("请写下一些感受吧～");
      const record = {
        emoji: this.selectedEmj || "💭",
        text: this.inputValue,
        time: Date.now()
      };
      this.moodRecords.push(record);

      if (this.currentUser) {
        this.saveUser();
      } else {
        const guest = JSON.parse(localStorage.getItem('emotion_guest') || '[]');
        guest.push(record);
        localStorage.setItem('emotion_guest', JSON.stringify(guest));
      }

      alert("心情便签已保存！");
      this.inputValue = '';
      this.selectedEmj = '';
    },
    
    toggleMood(idx) {
      if (this.expandedMood.has(idx)) this.expandedMood.delete(idx);
      else this.expandedMood.add(idx);
      this.expandedMood = new Set(this.expandedMood);
    },
    
    delMood(idx) {
      if (!confirm('确定删除这条心情吗？')) return;

      this.moodRecords.splice(idx, 1);
      this.expandedMood.delete(idx);
      this.expandedMood = new Set(this.expandedMood);

      if (this.currentUser) {
        this.saveUser();
      } else {
        localStorage.setItem('emotion_guest', JSON.stringify(this.moodRecords));
      }
    },
    
    // ===== 2. 日历方法 =====
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    
    isToday(year, month, day) {
      const today = new Date();
      return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
    },
    
    openRecordModal(dateObj) {
      if (!dateObj.day || dateObj.records.length === 0) return;
      this.modalDate = `${dateObj.day}日`;
      this.modalRecords = [...dateObj.records].reverse();
      this.showRecordModal = true;
    },
    
    closeRecordModal() {
      this.showRecordModal = false;
      this.modalDate = '';
      this.modalRecords = [];
    },
    
    formatTime(timestamp) {
      const d = new Date(timestamp);
      return d.toTimeString().slice(0, 5);
    },
    
    // ===== 3. MBTI测试方法 =====
    selectAnswer(index, choice) {
      this.userAnswers.splice(index, 1, choice);
    },
    
    submitMBTI() {
      if (this.userAnswers.some(ans => ans === null)) {
        alert("还有题目未完成，请完成所有问题后再提交！");
        return;
      }
      let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0;
      for (let i = 0; i < 15; i++) if (this.userAnswers[i] === 0) E++; else I++;
      for (let i = 15; i < 30; i++) if (this.userAnswers[i] === 0) S++; else N++;
      for (let i = 30; i < 45; i++) if (this.userAnswers[i] === 0) T++; else F++;
      for (let i = 45; i < 60; i++) if (this.userAnswers[i] === 0) J++; else P++;

      const type = (E > I ? 'E' : 'I') + (S > N ? 'S' : 'N') + (T > F ? 'T' : 'F') + (J > P ? 'J' : 'P');
      this.mbtiResult = type;
      if (this.currentUser) {
        this.currentUser.mbti = type;
        this.saveUser();
      }
    },
    
    getMBTIDescription(type) {
      const descriptions = {
        'ISTJ': '严谨负责的检查者', 'ISFJ': '温暖守护的照顾者', 'INFJ': '深邃理想的战略家',
        'INTJ': '理性远见的建筑师', 'ISTP': '冷静灵活的工匠', 'ISFP': '温和敏感的艺术家',
        'INFP': '理想主义的治愈者', 'INTP': '好奇思辨的思想家', 'ESTP': '活力四射的挑战者',
        'ESFP': '热情洋溢的表演者', 'ENFP': '创意无限的激励者', 'ENTP': '机智善辩的辩论家',
        'ESTJ': '高效务实的管理者', 'ESFJ': '体贴周到的组织者', 'ENFJ': '富有魅力的引导者', 
        'ENTJ': '果断自信的指挥官'
      };
      return descriptions[type] || '独特而复杂的个体';
    },
    
    // ===== 4. 星座解析方法 =====
    selectSign(sign) {
      this.selectedSign = sign;
    },
    
    getSignQuote(sign) {
      const quotes = {
        '白羊座': '真正的勇气不是无所畏惧，而是明知恐惧依然前行',
        '金牛座': '真正的财富不是拥有多少，而是珍惜所有',
        '双子座': '智慧不在于知道多少，而在于连接多少',
        '巨蟹座': '家不是地方，而是心之所安',
        '狮子座': '最亮的光来自内心的太阳',
        '处女座': '完美不在无缺，而在用心',
        '天秤座': '真正的平衡不在两端，而在中心',
        '天蝎座': '深度不在看见多少，而在感受多少',
        '射手座': '自由不在远方，而在心灵',
        '摩羯座': '高峰不在攀登，而在坚持',
        '水瓶座': '创新不在推翻，而在联结',
        '双鱼座': '现实与梦想之间，是创造力所在'
      }
      return quotes[sign] || '了解自己，成为更好的自己';
    },
    
// ===== 5. 树洞方法 =====
 submitConfession() {
      if (this.submitting) return;
      
      const message = this.treeholeMessage.trim();
      if (!message) {
        alert("请写下你的心事～");
        return;
      }
      
      this.submitting = true;
      
      try {
        // 生成回复
        const randomReply = this.wordslist[Math.floor(Math.random() * this.wordslist.length)];
        
        // 创建记录
        const confession = {
          id: Date.now(),
          message: message,
          reply: randomReply,
          time: Date.now(),
          emoji: this.getRandomEmoji(),
          isPublic: this.isPublic,
          likes: 0,
          comments: []
        };
        
        // 保存到个人历史
        this.treeholeHistory.push(confession);
        
        // 如果公开，保存到公开列表
        if (this.isPublic) {
          this.savePublicConfession(confession);
        }
        
        // 保存到本地存储
        if (this.currentUser) {
          this.saveUser();
        } else {
          localStorage.setItem('emotion_guest_treehole', JSON.stringify(this.treeholeHistory));
        }
        
        // 更新页面状态
        this.treeholeReply = randomReply;
        this.lastConfessionMessage = message;
        this.lastConfessionPublic = this.isPublic;
        this.submitted = true;
        
        // 清空输入
        this.treeholeMessage = '';
        this.isPublic = false;
        
      } catch (error) {
        console.error('提交失败:', error);
        alert('提交失败，请重试');
      } finally {
        this.submitting = false;
      }
    },
    
    // 保存公开心事
    savePublicConfession(confession) {
      let publicConfessions = JSON.parse(localStorage.getItem('emotion_public_confessions') || '[]');
      publicConfessions.unshift(confession);
      
      // 限制数量
      if (publicConfessions.length > 30) {
        publicConfessions = publicConfessions.slice(0, 30);
      }
      
      localStorage.setItem('emotion_public_confessions', JSON.stringify(publicConfessions));
      this.publicConfessions = publicConfessions;
    },
    
    // 加载公开心事
    loadPublicConfessions() {
      const saved = localStorage.getItem('emotion_public_confessions');
      this.publicConfessions = saved ? JSON.parse(saved) : [];
    },
    
    // 获取随机emoji
    getRandomEmoji() {
      const emojis = ['💭', '✨', '🌟', '🌙', '💖', '🌸', '☁️', '🌈'];
      return emojis[Math.floor(Math.random() * emojis.length)];
    },
    
    // 打开详情
    openConfessionDetail(confession) {
      this.currentDetail = { ...confession };
      this.newCommentText = ''; // 清空之前的评论输入
      this.showConfessionDetail = true;
    },
    
    // 关闭详情
    closeConfessionDetail() {
      this.showConfessionDetail = false;
      this.currentDetail = null;
    },
    
    // 点赞
    likeConfession(confession) {
      if (!confession) return;
      
      confession.likes = (confession.likes || 0) + 1;
      
      // 更新公开列表
      let publicConfessions = JSON.parse(localStorage.getItem('emotion_public_confessions') || '[]');
      publicConfessions = publicConfessions.map(c => 
        c.id === confession.id ? { ...c, likes: confession.likes } : c
      );
      
      localStorage.setItem('emotion_public_confessions', JSON.stringify(publicConfessions));
      this.publicConfessions = publicConfessions;
    },
    
    // 获取评论数量
    getCommentCount(confession) {
      return confession.comments ? confession.comments.length : 0;
    },
    
    // 清空输入
    clearMessage() {
      if (this.treeholeMessage.trim() && confirm("确定清空当前内容吗？")) {
        this.treeholeMessage = '';
      }
    },
    
    // 再写一封
    writeAnother() {
      this.submitted = false;
      this.treeholeMessage = '';
      this.treeholeReply = '';
      this.lastConfessionMessage = '';
    },
    
    // 格式化时间
    formatRelativeTime(timestamp) {
      const now = Date.now();
      const diff = now - timestamp;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      
      if (minutes < 1) return '刚刚';
      if (minutes < 60) return `${minutes}分钟前`;
      if (hours < 24) return `${hours}小时前`;
      if (days < 7) return `${days}天前`;
      
      const date = new Date(timestamp);
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    },
    
    formatFullTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString('zh-CN', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    // 提交评论
    submitComment(confession) {
      const commentText = this.newCommentText.trim();
      if (!commentText) {
        alert("评论不能为空哦～");
        return;
      }
      
      if (commentText.length > 200) {
        alert("评论不能超过200字");
        return;
      }
      
      const comment = {
        id: Date.now(),
        text: commentText,
        time: Date.now(),
        author: '匿名用户'
      };
      
      // 确保有评论数组
      if (!confession.comments) {
        confession.comments = [];
      }
      
      // 添加评论
      confession.comments.unshift(comment);
      
      // 更新公开心事列表
      let publicConfessions = JSON.parse(localStorage.getItem('emotion_public_confessions') || '[]');
      publicConfessions = publicConfessions.map(c => {
        if (c.id === confession.id) {
          return confession;
        }
        return c;
      });
      
      // 保存到本地存储
      localStorage.setItem('emotion_public_confessions', JSON.stringify(publicConfessions));
      this.publicConfessions = publicConfessions;
      
      // 清空输入
      this.newCommentText = '';
      
      // 更新当前详情
      if (this.showConfessionDetail && this.currentDetail && this.currentDetail.id === confession.id) {
        this.currentDetail = confession;
      }
      
      alert("评论已发表！");
    },
    
    // 初始化默认公开心事
    initDefaultPublicConfessions() {
      if (this.publicConfessions.length === 0) {
        const defaultConfessions = [
          {
            id: 'default_1',
            message: '今天终于鼓起勇气和喜欢的人说话了，虽然只是简单的问候，但心跳得好快！',
            reply: '勇敢的第一步总是最难的，为你感到骄傲！',
            time: Date.now() - 3600000,
            emoji: '💖',
            isPublic: true,
            likes: 5,
            comments: [],
            userId: 'anonymous_abc123'
          },
          {
            id: 'default_2',
            message: '工作压力好大，感觉自己快撑不住了，但又不敢和家人说怕他们担心...',
            reply: '你已经很努力了，给自己一个喘息的机会吧，照顾好自己的情绪也很重要',
            time: Date.now() - 7200000,
            emoji: '☁️',
            isPublic: true,
            likes: 8,
            comments: [],
            userId: 'anonymous_def456'
          },
          {
            id: 'default_3',
            message: '今天收到了期待已久的礼物，虽然不是什么贵重的东西，但感受到了朋友的心意，好温暖',
            reply: '珍贵的从来不是礼物本身，而是背后的心意和惦念',
            time: Date.now() - 10800000,
            emoji: '✨',
            isPublic: true,
            likes: 12,
            comments: [
              {
                id: 'comment_1',
                text: '真好啊，被人惦记的感觉最温暖了！',
                time: Date.now() - 5400000,
                author: 'anonymous_xyz789'
              }
            ],
            userId: 'anonymous_ghi789'
          }
        ];
        
        this.publicConfessions = defaultConfessions;
        localStorage.setItem('emotion_public_confessions', JSON.stringify(defaultConfessions));
      }
    },
    
    delTreehole(id) {
  if (!confirm('确定把这条树洞悄悄话删掉吗？')) return;

  const index = this.treeholeHistory.findIndex(item => item.id === id);
  if (index === -1) {
    alert('未找到该记录');
    return;
  }

  this.treeholeHistory.splice(index, 1);

  // 清理展开状态（可选：只清当前，或全清）
  this.expandedTH.clear(); // 简单起见，清空所有展开状态

  // 保存数据
  if (this.currentUser) {
    this.saveUser();
  } else {
    localStorage.setItem('emotion_guest_treehole', JSON.stringify(this.treeholeHistory));
  }

  alert('树洞记录已成功删除！');
},
    
    // 切换树洞展开状态
    toggleTreehole(idx) {
      if (this.expandedTH.has(idx)) {
        this.expandedTH.delete(idx);
      } else {
        this.expandedTH.add(idx);
      }
      // 触发响应式更新
      this.expandedTH = new Set(this.expandedTH);
    },
    
    // ===== 6. 用户系统方法 =====
    openLogin() {
      this.showLoginModal = true;
      this.showRegisterModal = false;
    },
    
    openRegister() {
      this.showRegisterModal = true;
      this.showLoginModal = false;
    },
    
    closeModals() {
      this.showLoginModal = false;
      this.showRegisterModal = false;
    },
    
    doLogin() {
      const users = JSON.parse(localStorage.getItem('emotionUsers') || '{}');
      const user = users[this.loginForm.username];
      if (!user || user.password !== this.loginForm.password) {
        alert("用户名或密码错误");
        return;
      }
      this.currentUser = { ...user, password: undefined };
      this.loadUserData(user.username);
      this.closeModals();
      alert('登录成功！');
    },
    
    doRegister() {
      const users = JSON.parse(localStorage.getItem('emotionUsers') || '{}');
      
      // === 添加表单验证 ===
      const form = this.registerForm;
      
      // 1. 用户名验证
      if (!form.username.trim()) {
        alert("用户名不能为空");
        return;
      }
      
      // 2. 密码验证
      if (!form.password) {
        alert("密码不能为空");
        return;
      }
      if (form.password.length < 6) {
        alert("密码至少需要6个字符");
        return;
      }
      
      // 3. 检查用户名是否已存在
      if (users[form.username]) {
        alert("该用户名已被注册！");
        return;
      }
      
      // === 创建新用户 ===
      const newUser = {
        ...form,
        password: form.password
      };

      users[newUser.username] = newUser;
      localStorage.setItem('emotionUsers', JSON.stringify(users));

      this.currentUser = {
        username: newUser.username,
        avatar:  newUser.avatar,
        gender:  newUser.gender,
        zodiac:  newUser.zodiac,
        mbti:    newUser.mbti
      };

      this.moodRecords = [];
      this.treeholeHistory = [];
      this.saveUser();

      this.closeModals();
      alert("注册成功！");
    },
    
    logout() {
      this.currentUser = null;
      this.moodRecords = [];
      this.treeholeHistory = [];
      alert('已退出登录');
    },
    
    saveUser() {
      if (!this.currentUser) return;
      const key = `emotion_user_data_${this.currentUser.username}`;
      const data = {
        moodRecords: this.moodRecords,
        treeholeHistory: this.treeholeHistory
      };
      localStorage.setItem(key, JSON.stringify(data));
    },
    
    loadUserData(username) {
      const key = `emotion_user_data_${username}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        this.moodRecords = data.moodRecords || [];
        this.treeholeHistory = data.treeholeHistory || [];
      } else {
        this.moodRecords = [];
        this.treeholeHistory = [];
      }
    },
    
    pickAvatar(e){
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        this.registerForm.avatar = ev.target.result;
      };
      reader.readAsDataURL(file);
      this.registerForm.avatarFile = file;
    }
  },
  
  mounted() {
    const lastUser = localStorage.getItem('emotion_last_user');
    if (lastUser) {
      const users = JSON.parse(localStorage.getItem('emotionUsers') || '{}');
      if (users[lastUser]) {
        this.currentUser = { ...users[lastUser], password: undefined };
        this.loadUserData(lastUser);
      }
    } else {
      this.moodRecords = JSON.parse(localStorage.getItem('emotion_guest') || '[]');
      this.treeholeHistory = JSON.parse(localStorage.getItem('emotion_guest_treehole') || '[]');
    }
    
 // 加载公开心事
  this.loadPublicConfessions();
  
  // 如果没有公开心事，初始化默认数据
  if (this.publicConfessions.length === 0) {
    setTimeout(() => {
      this.initDefaultPublicConfessions();
    }, 1000);
  }
  
  // 加载个人树洞历史
  if (this.currentUser) {
    this.loadUserData(this.currentUser.username);
  } else {
    this.treeholeHistory = JSON.parse(localStorage.getItem('emotion_guest_treehole') || '[]');
  }
  
  // 添加调试日志
  console.log('页面加载完成', {
    page: this.page,
    treeholeHistory: this.treeholeHistory.length,
    publicConfessions: this.publicConfessions.length
  });
},
  
  watch: {
    currentUser(val) {
      if (val) {
        localStorage.setItem('emotion_last_user', val.username);
       } else {
        localStorage.removeItem('emotion_last_user');
      }
    }
  }
}).mount("#Store");