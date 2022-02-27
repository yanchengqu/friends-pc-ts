import React from 'react';
import styles from './index.less';

export default function () {
  return (
    <>
      <div className={styles.headerFont}>
        <span>中国航天集团</span>
        <span className={styles.smallFont}>11月23日 周三</span>
      </div>
    </>
  );
}
