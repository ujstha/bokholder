import React, { useState } from "react";
import "../theme/books.css";
import { Form, Input, Icon, Select } from "antd";

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam, setSearchParam] = useState("book_name");

  return (
    <div className="my-3 container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <Form
            onSubmit={e => {
              e.preventDefault();
              document.location.href = `/page/books/${searchParam}/${searchQuery}`;
            }}
          >
            <Form.Item>
              <Input.Group compact>
                <Input
                  prefix={
                    <Icon type="search" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  style={{ width: "70%" }}
                  type="text"
                  size="large"
                  placeholder="Search with book's name, author or publisher......"
                  allowClear={true}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Select
                style={{ maxWidth: "30%" }}
                  value={searchParam}
                  onChange={(value: string) => setSearchParam(value)}
                  size="large"
                >
                  <Select.Option value="book_name">Book Name</Select.Option>
                  <Select.Option value="author">Author</Select.Option>
                  <Select.Option value="publisher">Publisher</Select.Option>
                </Select>
              </Input.Group>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
