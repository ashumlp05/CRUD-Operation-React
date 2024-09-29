import { useState } from "react";
import { postData } from "../api/PostApi";

export const Form = ({ data, setData }) => {
  const [addData, setAddData] = useState({
    title: " ",
    body: " ",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="add title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  );
};
