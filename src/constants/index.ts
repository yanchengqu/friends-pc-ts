export * from './types';

export const DefaultTimeout = 60000;

export enum EResponseCode {
  Success = 200000,
  TOKEN_INVALID = 400001001, // token 失效
  LOGIN_FAILURE = 600201, // token错误 未登录提示码
}
