import Edit from "../img/edit.svg"
import Delete from "../img/delete.svg"
import Menu from '../components/Menu'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import moment from 'moment'
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const donaim = "https://mysql-blog-backend.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${donaim}/api/post/${postId}`)
        setPost(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [postId]);

  async function handleDelete() {
    try {
      await axios.delete(`${donaim}/api/post/${postId}`)
      navigate("/")
    } catch(err) {
      console.log(err)
    }
  }

  function getText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="single">
      <div className="content">
        <h1>{post.title}</h1>
        <div className="user">
          <div className="info">
            <span>Written by {post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.desc }} />
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single