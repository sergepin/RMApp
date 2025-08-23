import { Request, Response, NextFunction } from 'express';

interface LogRequest extends Request {
  startTime?: number;
}


export const LOGGER_CONFIG = {
  enabled: true,
  logGraphQL: true
};

export const setLoggerEnabled = (enabled: boolean) => {
  LOGGER_CONFIG.enabled = enabled;
  console.log(`MIDDLEWARE - Logger ${enabled ? 'ON' : 'OFF'}`);
};

export const requestLogger = (req: LogRequest, res: Response, next: NextFunction) => {
  if (!LOGGER_CONFIG.enabled) return next();

  req.startTime = Date.now();
  
  console.log(`MIDDLEWARE - 📥 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  
  if (req.url === '/graphql' && LOGGER_CONFIG.logGraphQL && req.body?.operationName) {
    console.log(`MIDDLEWARE - 🔍 GraphQL: ${req.body.operationName}`);
  }
  
  const originalSend = res.send;
  res.send = function(data) {
    if (LOGGER_CONFIG.enabled) {
      const duration = Date.now() - (req.startTime || Date.now());
      console.log(`MIDDLEWARE - 📤 ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    }
    return originalSend.call(this, data);
  };
  
  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!LOGGER_CONFIG.enabled) return next(err);
  
  console.log(`MIDDLEWARE - ❌ ERROR: ${err.message} - ${req.url}`);
  next(err);
};
