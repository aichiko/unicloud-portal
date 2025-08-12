import loglevel from 'loglevel';

// 扩展 Window 接口以支持自定义属性
declare global {
  interface Window {
    logLevel?: {
      setLevel: (level: string) => void;
      getLevel: () => string;
      enableAll: () => void;
      disableAll: () => void;
      enableStackTracking?: () => void;
      debugStack?: () => void;
    };
    isLogStackEnabled?: boolean;
  }
}

// 标记当前环境
const isDevelopment = process.env.NODE_ENV !== 'production';

// 创建主日志记录器并增强
const mainLogger = loglevel.getLogger('app:portal');

// 设置默认日志级别
mainLogger.setLevel(isDevelopment ? 'debug' : 'error');

// 创建模块日志记录器工厂
const createModuleLogger = (moduleName: string) => {
  const logger = loglevel.getLogger(`app:portal:${moduleName}`);
  logger.setLevel(mainLogger.getLevel());
  return logger;
};

// 定义 Logger 接口
interface Logger {
  main: loglevel.Logger;
  loglevel: loglevel.RootLogger;
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  trace: (...args: any[]) => void;
  formatObject: (obj: any) => string;
  group: (name: string, fn: () => any) => any;
  time: (label: string) => number;
  timeEnd: (label: string, startTime: number) => number;
  setLevel: (level: string) => string;
  getLevel: () => string;
  enableStackTracking?: () => void;
  debugStack?: () => void;
}

// 创建日志模块集合
const logger: Logger = {
  /**
   * 主日志记录器，用于记录应用程序的主要日志信息。
   */
  main: mainLogger,
  
  // 将原始的 loglevel 实例暴露出来
  loglevel,
  
  // 常用方法 - 使用增强版记录器
  info: (...args: any[]) => mainLogger.info(...args),
  warn: (...args: any[]) => mainLogger.warn(...args),
  error: (...args: any[]) => mainLogger.error(...args),
  debug: (...args: any[]) => mainLogger.debug(...args),
  trace: (...args: any[]) => mainLogger.trace(...args),
  
  // 实用方法
  formatObject: (obj: any) => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return '[无法序列化的对象]';
    }
  },
  
  group: (name: string, fn: () => any) => {
    mainLogger.info(`▼ ${name} 开始`);
    const result = fn();
    mainLogger.info(`▲ ${name} 结束`);
    return result;
  },
  
  time: (label: string) => {
    return performance.now();
  },
  
  timeEnd: (label: string, startTime: number) => {
    const duration = performance.now() - startTime;
    mainLogger.info(`⏱ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  },

  // 统一设置日志级别的方法
  setLevel: (level: string) => {
    mainLogger.setLevel(level as loglevel.LogLevelDesc);
    // 更新所有模块日志记录器的级别
    return level;
  },

  // 获取当前日志级别
  getLevel: () => mainLogger.getLevel().toString(),
};

// 浏览器环境下添加控制台命令
if (typeof window !== 'undefined') {
  // 从本地存储加载设置
  const savedStackTracking = localStorage.getItem('logStackTracking');
  if (savedStackTracking !== null) {
    window.isLogStackEnabled = savedStackTracking === 'true';
  }
  
  // 添加到窗口对象
  window.logLevel = {
    setLevel: (level: string) => {
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
    // 添加堆栈跟踪控制（如果存在）
    enableStackTracking: logger.enableStackTracking,
    debugStack: logger.debugStack
  };
  
  console.log(`当前日志级别: ${logger.getLevel()}`);
}

export default logger;