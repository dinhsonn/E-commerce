import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostServices from '../../../services/PostServices';
import moment from 'moment';
import Header from '../../../components/Public/Header';


function Blog() {
    const [posts, setPost] = useState([]);
  
    useEffect(() => {
        PostServices.getAll()
            .then(response => { 
                const sortedPosts = response.data.content.sort((a, b) => b.id - a.id);
                const top3Posts = sortedPosts.slice(0, 3);

                setPost(top3Posts);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

  
  
    return ( 

      <>
        <div className="blog-posts">
        <div className="container">
          <h2 className="title text-center">From Our Blog</h2>
          {/* End .title-lg text-center */}
          <div
            className="owl-carousel owl-simple carousel-with-shadow"
            data-toggle="owl"
            data-owl-options='{
                      "nav": false, 
                      "dots": true,
                      "items": 3,
                      "margin": 20,
                      "loop": false,
                      "responsive": {
                          "0": {
                              "items":1
                          },
                          "600": {
                              "items":2
                          },
                          "992": {
                              "items":3
                          }
                      }
                  }'
          >
            {posts.map((post, index) => (
            <article key={index} className="entry entry-display" style={{width:'360px',float:'left',height:'420px',margin:'14px'}}>
              <figure className="entry-media">
              <Link to={`/postdetail/${post.id}`}>
                  <img
                   src={`http://localhost:8384/api/sliders/image/${post.image}`}
                    alt="image desc"
                  />
                </Link>
              </figure>
              {/* End .entry-media */}
              <div className="entry-body text-center">
                <div className="entry-meta">
                  <a href="#">{moment(post.createdAt).format('MMM DD, YYYY')}</a>, 0 Comments
                </div>
                {/* End .entry-meta */}
                <h3 className="entry-title">
                <Link to={`/postdetail/${post.id}`}>{post.title}</Link>
                </h3>
                {/* End .entry-title */}
                <div className="entry-content">
                  <Link to={`/postdetail/${post.id}`} className="read-more">
                    Continue Reading
                  </Link>
                </div>
                {/* End .entry-content */}
              </div>
              {/* End .entry-body */}
            </article>
                     ))}
  
            {/* End .entry */}
          </div>
          {/* End .owl-carousel */}
          <div className="more-container text-center mt-2">
            <a href="/post" className="btn btn-outline-darker btn-more">
              <span>View more articles</span>
              <i className="icon-long-arrow-right" />
            </a>
          </div>
          {/* End .more-container */}
        </div>
        {/* End .container */}
      </div>
      </>
     );
}

export default Blog;