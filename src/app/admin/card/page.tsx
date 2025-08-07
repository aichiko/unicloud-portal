"use client";

import React, { useState } from "react";
import { Input, Select, Button, Space, Table, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import {
  SearchOutlined,
  SyncOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "./page.module.css";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const initialData: DataType[] = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "北京",
    children: [
      {
        key: "1-1",
        name: "张三 - 子项 1",
        age: 10,
        address: "北京 - 子项 1",
      },
      {
        key: "1-2",
        name: "张三 - 子项 2",
        age: 8,
        address: "北京 - 子项 2",
      },
    ],
  },
  {
    key: "2",
    name: "李四",
    age: 42,
    address: "上海",
  },
];

function Card() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      {/* 搜索 */}
      <div className={styles.searchArea}>
        <div className={styles.searchItem}>
          <span className={["mr-4", styles.title].join(" ")}>标题</span>
          <Input placeholder="请输入标题" style={{ width: 200 }} />
        </div>
        <div className={styles.searchItem}>
          <span className={["mr-4", styles.title].join(" ")}>父级</span>
          <Select
            style={{ width: 200 }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
        <Space>
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button icon={<SyncOutlined />}>重置</Button>
        </Space>
      </div>
      {/* 按钮 */}
      <div className="flex items-center justify-between mt-4 mb-4">
        <Space>
          <Button color="primary" variant="outlined" icon={<PlusOutlined />}>
            新增
          </Button>
          <Button color="cyan" variant="outlined" icon={<DeleteOutlined />}>
            删除
          </Button>
          <Button color="danger" variant="outlined" icon={<EditOutlined />}>
            修改
          </Button>
        </Space>
      </div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={initialData}
        />
      </Space>
    </>
  );
}

export default Card;
