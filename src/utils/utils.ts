import JSEncrypt from 'jsencrypt';
/**
 * menu Highlight key
 * @param pathname string
 */
export const queryKeysByPath = (
  pathname: string,
): { openKey: string; selectKey: string } => {
  const reg = /(^\/*)|(\/*$)/g; // 匹配字符串首尾斜杠
  const path = pathname.replace(reg, '');
  const routes = path.split('/');
  return { openKey: routes[0], selectKey: routes[1] || routes[0] };
};

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC2moFBImL1Dax2ZddFih3QJL+Wm+Syp0gOqc5FP0NwUJRC+7ITb6KItzovdPGgWTlfA1yUUAw3ynRhRbQTgtU4jVeJSRDD0dYBMWLrx4rfwO+6+GFsua7AXURMGPf9SsfsLO89Z00eBT0b03XPXkA8ZfygbyhSkywnWtm1GXgMQIDAQAB',
  ); // 设置公钥
  return encryptor.encrypt(txt); // 对需要加密的数据进行加密
}
