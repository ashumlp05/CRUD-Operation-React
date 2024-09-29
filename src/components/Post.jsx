import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { Form } from "./Form";

export const Post = () => {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPost = data.filter((curPost) => {
          return curPost.id != id;
        });
        setData(newUpdatedPost);
      }
    } catch (error) {
      console.log(Error);
    }
  };

  return (
    <>
      <section className="section-form">
        <Form data={data} setData={setData} />
      </section>

      <section className="section-post">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button className="edit-btn">EDIT</button>
                <button
                  className="dlt-btn"
                  onClick={() => handleDeletePost(id)}
                >
                  DELETE
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};
