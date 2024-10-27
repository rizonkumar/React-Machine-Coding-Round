import { useState } from "react";
import Pagination from "./Pagination";
import { useEffect } from "react";
import axios from "axios";

const Post = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=5`
      );
      console.log("response", response);
      setData(response.data);
    };
    fetchData();
  }, [pageNo]);

  return (
    <div className="container">
      <div className="post-container">
        {data.map((item) => {
          return <img src={item?.download_url} alt="post" key={item?.id} />;
        })}
      </div>
      <Pagination pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  );
};

export default Post;
