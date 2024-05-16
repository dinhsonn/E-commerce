import PostTopic from "./PostTopic";
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import PostServices from '../../../services/PostServices';
import Header from "../../../components/Public/Header";
function PostDetail({ match }) {
  const [posts, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    // Assuming you have a function like PostServices.getById(id)
    PostServices.getById(id)
      .then(response => {
        document.title=response.data.title;
        console.log('Data from API:', response.data);
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);
  if (!posts) {
    return <p>Loading...</p>;
  }
    return ( 
        <>
        <Header />
  <div className="page-wrapper">
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
              Default With Sidebar
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
              <article className="entry single-entry">
      
                {/* End .entry-media */}
                <div className="entry-body">
                  <div className="entry-content editor-content">
              
                    <div className="pb" />
                    {/* End .pb-1 */}
                    <h3>{posts?.title}</h3>
                    <img src={`http://localhost:8384/api/sliders/image/${posts?.image}`} alt="image" />
                    
                
                    <p>
                     {posts.detail}{" "}
                    </p>
                  </div>
                  {/* End .entry-content */}
                  <div className="entry-footer row no-gutters flex-column flex-md-row">
                    <div className="col-md">
                      <div className="entry-tags">
                        <span>Tags:</span> <a href="#">photography</a>{" "}
                        <a href="#">style</a>
                      </div>
                      {/* End .entry-tags */}
                    </div>
                    {/* End .col */}
                    <div className="col-md-auto mt-2 mt-md-0">
                      <div className="social-icons social-icons-color">
                        <span className="social-label">Share this post:</span>
                        <a
                          href="#"
                          className="social-icon social-facebook"
                          title="Facebook"
                          target="_blank"
                        >
                          <i className="icon-facebook-f" />
                        </a>
                        <a
                          href="#"
                          className="social-icon social-twitter"
                          title="Twitter"
                          target="_blank"
                        >
                          <i className="icon-twitter" />
                        </a>
                        <a
                          href="#"
                          className="social-icon social-pinterest"
                          title="Pinterest"
                          target="_blank"
                        >
                          <i className="icon-pinterest" />
                        </a>
                        <a
                          href="#"
                          className="social-icon social-linkedin"
                          title="Linkedin"
                          target="_blank"
                        >
                          <i className="icon-linkedin" />
                        </a>
                      </div>
                      {/* End .soial-icons */}
                    </div>
                    {/* End .col-auto */}
                  </div>
                  {/* End .entry-footer row no-gutters */}
                </div>
                {/* End .entry-body */}
         
                {/* End .entry-author-details*/}
              </article>
              {/* End .entry */}
              <nav className="pager-nav" aria-label="Page navigation">
                <a
                  className="pager-link pager-link-prev"
                  href="#"
                  aria-label="Previous"
                  tabIndex={-1}
                >
                  Previous Post
                  <span className="pager-link-title">
                    Cras iaculis ultricies nulla
                  </span>
                </a>
                <a
                  className="pager-link pager-link-next"
                  href="#"
                  aria-label="Next"
                  tabIndex={-1}
                >
                  Next Post
                  <span className="pager-link-title">
                    Praesent placerat risus
                  </span>
                </a>
              </nav>
              {/* End .pager-nav */}
              <div className="related-posts">
                <h3 className="title">Related Posts</h3>
                {/* End .title */}
                <div
                  className="owl-carousel owl-simple"
                  data-toggle="owl"
                  data-owl-options='{
                                  "nav": false, 
                                  "dots": true,
                                  "margin": 20,
                                  "loop": false,
                                  "responsive": {
                                      "0": {
                                          "items":1
                                      },
                                      "480": {
                                          "items":2
                                      },
                                      "768": {
                                          "items":3
                                      }
                                  }
                              }'
                >
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="single.html">
                        <img
                          src="assets/images/blog/grid/3cols/post-1.jpg"
                          alt="image desc"
                        />
                      </a>
                    </figure>
                    {/* End .entry-media */}
                    <div className="entry-body">
                      <div className="entry-meta">
                        <a href="#">Nov 22, 2018</a>
                        <span className="meta-separator">|</span>
                        <a href="#">2 Comments</a>
                      </div>
                      {/* End .entry-meta */}
                      <h2 className="entry-title">
                        <a href="single.html">Cras ornare tristique elit.</a>
                      </h2>
                      {/* End .entry-title */}
                      <div className="entry-cats">
                        in <a href="#">Lifestyle</a>,<a href="#">Shopping</a>
                      </div>
                      {/* End .entry-cats */}
                    </div>
                    {/* End .entry-body */}
                  </article>
                  {/* End .entry */}
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="single.html">
                        <img
                          src="assets/images/blog/grid/3cols/post-2.jpg"
                          alt="image desc"
                        />
                      </a>
                    </figure>
                    {/* End .entry-media */}
                    <div className="entry-body">
                      <div className="entry-meta">
                        <a href="#">Nov 21, 2018</a>
                        <span className="meta-separator">|</span>
                        <a href="#">0 Comments</a>
                      </div>
                      {/* End .entry-meta */}
                      <h2 className="entry-title">
                        <a href="single.html">Vivamus ntulla necante.</a>
                      </h2>
                      {/* End .entry-title */}
                      <div className="entry-cats">
                        in <a href="#">Lifestyle</a>
                      </div>
                      {/* End .entry-cats */}
                    </div>
                    {/* End .entry-body */}
                  </article>
                  {/* End .entry */}
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="single.html">
                        <img
                          src="assets/images/blog/grid/3cols/post-3.jpg"
                          alt="image desc"
                        />
                      </a>
                    </figure>
                    {/* End .entry-media */}
                    <div className="entry-body">
                      <div className="entry-meta">
                        <a href="#">Nov 18, 2018</a>
                        <span className="meta-separator">|</span>
                        <a href="#">3 Comments</a>
                      </div>
                      {/* End .entry-meta */}
                      <h2 className="entry-title">
                        <a href="single.html">Utaliquam sollicitudin leo.</a>
                      </h2>
                      {/* End .entry-title */}
                      <div className="entry-cats">
                        in <a href="#">Fashion</a>,<a href="#">Lifestyle</a>
                      </div>
                      {/* End .entry-cats */}
                    </div>
                    {/* End .entry-body */}
                  </article>
                  {/* End .entry */}
                  <article className="entry entry-grid">
                    <figure className="entry-media">
                      <a href="single.html">
                        <img
                          src="assets/images/blog/grid/3cols/post-4.jpg"
                          alt="image desc"
                        />
                      </a>
                    </figure>
                    {/* End .entry-media */}
                    <div className="entry-body">
                      <div className="entry-meta">
                        <a href="#">Nov 15, 2018</a>
                        <span className="meta-separator">|</span>
                        <a href="#">4 Comments</a>
                      </div>
                      {/* End .entry-meta */}
                      <h2 className="entry-title">
                        <a href="single.html">Fusce pellentesque suscipit.</a>
                      </h2>
                      {/* End .entry-title */}
                      <div className="entry-cats">
                        in <a href="#">Travel</a>
                      </div>
                      {/* End .entry-cats */}
                    </div>
                    {/* End .entry-body */}
                  </article>
                  {/* End .entry */}
                </div>
                {/* End .owl-carousel */}
              </div>
              {/* End .related-posts */}
              <div className="comments">
                <h3 className="title">3 Comments</h3>
                {/* End .title */}
                <ul>
                  <li>
                    <div className="comment">
                      <figure className="comment-media">
                        <a href="#">
                          <img
                            src="assets/images/blog/comments/1.jpg"
                            alt="User name"
                          />
                        </a>
                      </figure>
                      <div className="comment-body">
                        <a href="#" className="comment-reply">
                          Reply
                        </a>
                        <div className="comment-user">
                          <h4>
                            <a href="#">Jimmy Pearson</a>
                          </h4>
                          <span className="comment-date">
                            November 9, 2018 at 2:19 pm
                          </span>
                        </div>
                        {/* End .comment-user */}
                        <div className="comment-content">
                          <p>
                            Sed pretium, ligula sollicitudin laoreet viverra,
                            tortor libero sodales leo, eget blandit nunc tortor
                            eu nibh. Nullam mollis. Ut justo. Suspendisse
                            potenti.{" "}
                          </p>
                        </div>
                        {/* End .comment-content */}
                      </div>
                      {/* End .comment-body */}
                    </div>
                    {/* End .comment */}
                    <ul>
                      <li>
                        <div className="comment">
                          <figure className="comment-media">
                            <a href="#">
                              <img
                                src="assets/images/blog/comments/2.jpg"
                                alt="User name"
                              />
                            </a>
                          </figure>
                          <div className="comment-body">
                            <a href="#" className="comment-reply">
                              Reply
                            </a>
                            <div className="comment-user">
                              <h4>
                                <a href="#">Lena Knight</a>
                              </h4>
                              <span className="comment-date">
                                November 9, 2018 at 2:19 pm
                              </span>
                            </div>
                            {/* End .comment-user */}
                            <div className="comment-content">
                              <p>Morbi interdum mollis sapien. Sed ac risus.</p>
                            </div>
                            {/* End .comment-content */}
                          </div>
                          {/* End .comment-body */}
                        </div>
                        {/* End .comment */}
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="comment">
                      <figure className="comment-media">
                        <a href="#">
                          <img
                            src="assets/images/blog/comments/3.jpg"
                            alt="User name"
                          />
                        </a>
                      </figure>
                      <div className="comment-body">
                        <a href="#" className="comment-reply">
                          Reply
                        </a>
                        <div className="comment-user">
                          <h4>
                            <a href="#">Johnathan Castillo</a>
                          </h4>
                          <span className="comment-date">
                            November 9, 2018 at 2:19 pm
                          </span>
                        </div>
                        {/* End .comment-user */}
                        <div className="comment-content">
                          <p>
                            Vestibulum volutpat, lacus a ultrices sagittis, mi
                            neque euismod dui, eu pulvinar nunc sapien ornare
                            nisl. Phasellus pede arcu, dapibus eu, fermentum et,
                            dapibus sed, urna.
                          </p>
                        </div>
                        {/* End .comment-content */}
                      </div>
                      {/* End .comment-body */}
                    </div>
                    {/* End .comment */}
                  </li>
                </ul>
              </div>
              {/* End .comments */}
              <div className="reply">
                <div className="heading">
                  <h3 className="title">Leave A Reply</h3>
                  {/* End .title */}
                  <p className="title-desc">
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                </div>
                {/* End .heading */}
                <form action="#">
                  <label htmlFor="reply-message" className="sr-only">
                    Comment
                  </label>
                  <textarea
                    name="reply-message"
                    id="reply-message"
                    cols={30}
                    rows={4}
                    className="form-control"
                    required=""
                    placeholder="Comment *"
                    defaultValue={""}
                  />
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="reply-name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="reply-name"
                        name="reply-name"
                        required=""
                        placeholder="Name *"
                      />
                    </div>
                    {/* End .col-md-6 */}
                    <div className="col-md-6">
                      <label htmlFor="reply-email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="reply-email"
                        name="reply-email"
                        required=""
                        placeholder="Email *"
                      />
                    </div>
                    {/* End .col-md-6 */}
                  </div>
                  {/* End .row */}
                  <button type="submit" className="btn btn-outline-primary-2">
                    <span>POST COMMENT</span>
                    <i className="icon-long-arrow-right" />
                  </button>
                </form>
              </div>
              {/* End .reply */}
            </div>
            {/* End .col-lg-9 */}
            <PostTopic/>
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
</>

     );
}

export default PostDetail;