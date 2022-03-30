import React, { useState } from 'react';
import styles from './index.less';
import { TabList } from '@/components';
export default function () {
  const list = [
    {
      id: 0,
      name: '库房监控',
    },
    {
      id: 1,
      name: '充电区监控',
    },
    {
      id: 2,
      name: '电池存储区',
    },
    {
      id: 3,
      name: '无人机存放区',
    },
  ];
  const [activeItem, setActiveItem] = useState(list[0]);
  const onClick = (active, item) => {
    console.log(item);
    setActiveItem(item);
  };

  return (
    <>
      <div className={styles.headerFont}>
        <span>中国航天集团</span>
        <span className={styles.smallFont}>11月23日 周三</span>
        <TabList list={list} onClick={onClick} activeItem={activeItem} />
      </div>
    </>
  );
}
