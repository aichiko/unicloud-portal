import loglevel from 'loglevel';

// 标记当前环境
// eslint-disable-next-line no-undef
const isDevelopment = process.env.NODE_ENV !== 'production';

// 创建主日志记录器并增强
const mainLogger = loglevel.getLogger('app:portal');

// 设置默认日志级别
// eslint-disable-next-line no-undef
mainLogger.setLevel(isDevelopment ? 'debug' : 'error');

// 创建模块日志记录器工厂
const createModuleLogger = (moduleName) => {
  const logger = loglevel.getLogger(`app:portal:${moduleName}`)
  logger.setLevel(mainLogger.getLevel());
  return logger;
};

// 创建日志模块集合
const logger = {
  /**
   * 主日志记录器，用于记录应用程序的主要日志信息。
   * @type {loglevel.Logger}
   */
  main: mainLogger,
  
  // 将原始的 loglevel 实例暴露出来
  loglevel,
  
  // 常用方法 - 使用增强版记录器
  info: (...args) => mainLogger.info(...args),
  warn: (...args) => mainLogger.warn(...args),
  error: (...args) => mainLogger.error(...args),
  debug: (...args) => mainLogger.debug(...args),
  trace: (...args) => mainLogger.trace(...args),
  
  // 实用方法 - 保持不变
  formatObject: (obj) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return '[无法序列化的对象]';
    }
  },
  
  group: (name, fn) => {
    mainLogger.info(`▼ ${name} 开始`);
    const result = fn();
    mainLogger.info(`▲ ${name} 结束`);
    return result;
  },
  
  time: (label) => {
    return performance.now();
  },
  
  timeEnd: (label, startTime) => {
    const duration = performance.now() - startTime;
    mainLogger.info(`⏱ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  },
};

// 统一设置日志级别的方法
logger.setLevel = (level) => {
  mainLogger.setLevel(level);
  // 更新所有模块日志记录器的级别
  return level;
};

// 获取当前日志级别
logger.getLevel = () => mainLogger.getLevel();

// 浏览器环境下添加控制台命令
if (typeof window !== 'undefined') {
  // 从本地存储加载设置
  const savedStackTracking = localStorage.getItem('logStackTracking');
  if (savedStackTracking !== null) {
    window.isLogStackEnabled = savedStackTracking === 'true';
  }
  
  // 添加到窗口对象
  window.logLevel = {
    setLevel: (level) => {
      logger.setLevel(level);
      localStorage.setItem('logLevel', level);
      console.log(`日志级别已设置为: ${level}`);
    },
    getLevel: () => logger.getLevel(),
    enableAll: () => {
      logger.setLevel('trace');
      localStorage.setItem('logLevel', 'trace');
      console.log('已启用所有日志 (trace级别)');
    },
    disableAll: () => {
      logger.setLevel('silent');
      localStorage.setItem('logLevel', 'silent');
      console.log('已禁用所有日志');
    },
    // 添加堆栈跟踪控制
    enableStackTracking: logger.enableStackTracking,
    debugStack: logger.debugStack
  };
  
  console.log(`当前日志级别: ${logger.getLevel()}`);
}

export default logger;