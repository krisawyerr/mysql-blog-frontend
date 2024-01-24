import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  const donaim = "https://mysql-blog-backend.vercel.app";
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  console.log(posts)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${donaim}/api/post${cat}`)
        setPosts(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [cat]);

  function getText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (post) =>
        regex.test(post.country) ||
        regex.test(post.title) ||
        regex.test(post.desc)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <div className='home'>
      <div className='headTest'>
        <h1>Uncover and Share<br/><span>Fascinating Travel Blogs</span></h1>
        <p>Travel Journal Collective is an open platform designed for the modern<br/> wanderer, offering a creative space to discover, craft, and share captivating<br/> travel stories</p>
      </div>

      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a title or country'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      {searchText ? (
        <div className="posts">{searchedResults.map(post => (
          <div className="post" key={post.id}>
            <div className="content">
              <div className='header'>
                <div>
                  <Link className='link' to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div>A story about {post.country}</div>
                </div>
                <div className='postDesc'>
                  <div>Written by {post.username}</div>
                  <div>Posted {moment(post.date).fromNow()}</div>
                </div>
              </div>             
              {getText(post.desc).slice(0,780) + "..."}
              <Link className='link' to={`/post/${post.id}`}>
                <button className='readMore'>Read more</button>
              </Link> 
            </div>
          </div>
        ))}</div>
      ):(
        <div className="posts">{posts.map(post => (
          <div className="post" key={post.id}>
            <div className="content">
              <div className='header'>
                <div>
                  <Link className='link' to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <div className='storyCountry'>A story about {post.country}</div>
                </div>
                <div className='postDesc'>
                  <div>Written by {post.username}</div>
                  <div>Posted {moment(post.date).fromNow()}</div>
                </div>
              </div>             
              {getText(post.desc).slice(0,780) + "..."}
              <Link className='link' to={`/post/${post.id}`}>
                <button className='readMore'>Read more</button>
              </Link> 
            </div>
          </div>
        ))}</div>
      )}
    </div>
  )
}

export default Home