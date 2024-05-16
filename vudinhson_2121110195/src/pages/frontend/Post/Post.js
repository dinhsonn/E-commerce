import PostTopic from "./PostTopic";
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PostServices from '../../../services/PostServices';
import moment from 'moment';
import Header from "../../../components/Public/Header";
import Footer from "../../../components/Public/Footer";


function truncateText(text, limit) {
  const words = text.split(' ');
  const truncated = words.slice(0, limit).join(' ');

  return truncated + (words.length > limit ? '...' : '');
}

function Post() {
  document.title="Blog";
  const [posts, setPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  useEffect(() => {
    PostServices.getAll()
      .then(response => {
        setPost(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const getImgUrl = (imageName) => {
    const endpoint = 'posts'; 
    return `http://localhost:8081/api/${endpoint}/image/${imageName}`;
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  
    return ( <>
    
        <div className="page-wrapper">
          <Header />
          <main className="main">
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
              <div className="container">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Blog</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Listing
                  </li>
                </ol>
              </div>
              {/* End .container */}
            </nav>
            {/* End .breadcrumb-nav */}
            <div className="page-content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                  {currentPosts.map((post, index) => (
                    <article className="entry entry-list">
                      <div className="row align-items-center">
                        <div className="col-md-5">
                          <figure className="entry-media">
                            <Link to={`/postdetail/${post.id}`}>
                              <img
                                src={`http://localhost:8384/api/sliders/image/${post.image}`}
                                alt="image desc"
                              />
                            </Link>
                          </figure>
                          {/* End .entry-media */}
                        </div>
                        {/* End .col-md-5 */}
                        <div className="col-md-7">
                          <div className="entry-body">
                            <div className="entry-meta">
                          
                              <span className="meta-separator">|</span>
                              <a href="#">{moment(post.createdAt).format('MMM DD, YYYY')}</a>
                              <span className="meta-separator">|</span>
                              <a href="#">2 Comments</a>
                            </div>
                            {/* End .entry-meta */}
                            <h2 className="entry-title">

                              <Link to={`/postdetail/${post.id}`}>{post.title}</Link>
                            </h2>
                            {/* End .entry-title */}
                            <div className="entry-cats">
                              in <a href="#">{post.topicId.name}</a>
                            </div>
                            {/* End .entry-cats */}
                            <div className="entry-content">
                              <p>
                              {truncateText(post.detail, 20)}{" "}
                              </p>
                              <Link to={`/postdetail/${post.id}`} className="read-more">
                                Continue Reading
                              </Link>
                            </div>
                            {/* End .entry-content */}
                          </div>
                          {/* End .entry-body */}
                        </div>
                        {/* End .col-md-7 */}
                      </div>
                      {/* End .row */}
                    </article>
                  ))}
                    {/* End .entry */}
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <a
                            className="page-link page-link-prev"
                            href="#"
                            aria-label="Previous"
                            tabIndex={-1}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <span aria-hidden="true">
                              <i className="icon-long-arrow-left" />
                            </span>
                            Prev
                          </a>
                        </li>
                        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                        <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                          <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                          {index + 1}
                          </a>
                        </li>
                         ))}
                  
                  <li className={`page-item ${currentPage === Math.ceil(posts.length / postsPerPage) ? 'disabled' : ''}`}>
                          <a
                            className="page-link page-link-next"
                            href="#"
                            aria-label="Next"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                          >
                            Next{" "}
                            <span aria-hidden="true">
                              <i className="icon-long-arrow-right" />
                            </span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  {/* End .col-lg-9 */}
                    <PostTopic />
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </div>
            {/* End .page-content */}
          </main>
          {/* End .main */}
        </div>
        {/* End .page-wrapper */}
        <button id="scroll-top" title="Back to Top">
          <i className="icon-arrow-up" />
        </button>
       <Footer />
      </>
     
       );
}

export default Post;