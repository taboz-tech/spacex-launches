import React from "react";
import { Table } from "antd";

const LaunchList = ({ launches, setSelectedLaunch }) => {
  const columns = [
    {
      title: "Flight Number",
      dataIndex: "flight_number",
      sorter: (a, b) => a.flight_number - b.flight_number,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Launch Date",
      dataIndex: "date_utc",
      sorter: (a, b) => new Date(a.date_utc) - new Date(b.date_utc),
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className="my-4">
      <Table
        columns={columns}
        dataSource={launches}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => setSelectedLaunch(record),
        })}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
      />
    </div>
  );
};

export default LaunchList;
