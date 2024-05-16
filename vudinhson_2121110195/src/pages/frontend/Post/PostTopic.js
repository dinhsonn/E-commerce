import React, { useEffect, useState } from 'react';
import TopicServices from '../../../services/TopicServices';
import PostServices from '../../../services/PostServices';
import Header from '../../../components/Public/Header';
import Footer from '../../../components/Public/Footer';
function PostTopic({ updatePostList }) {
    const [topics, setTopic] = useState([]);

    useEffect(() => {
        TopicServices.getAll()
        .then(response => {
        
          setTopic(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
    const handleTopicClick = (topicId) => {
      PostServices.getPostByTopicId(topicId)
        .then(response => {
          updatePostList(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    return (
      <>
        <aside className="col-lg-3">  
        <div className="sidebar">
          <div className="widget widget-search">
            <h3 className="widget-title">Search</h3>
            {/* End .widget-title */}
            <form action="#">
              <label htmlFor="ws" className="sr-only">
                Search in blog
              </label>
              <input
                type="search"
                className="form-control"
                name="ws"
                id="ws"
                placeholder="Search in blog"
                required=""
              />
              <button type="submit" className="btn">
                <i className="icon-search" />
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
          {/* End .widget */}
          <div className="widget widget-cats">
            <h3 className="widget-title">Topic List</h3>
            {/* End .widget-title */}
            <ul>
            {topics.map((topic, index) => (
              <li>
                <a href="#" onClick={() => handleTopicClick(topic.id)}>
                  {topic.name}
                </a>
              </li>
            ))}
            </ul>
          </div>
    
          {/* End .widget */}
          <div className="widget">
            <h3 className="widget-title">Browse Tags</h3>
            {/* End .widget-title */}
            <div className="tagcloud">
              <a href="#">fashion</a>
              <a href="#">style</a>
              <a href="#">women</a>
              <a href="#">photography</a>
              <a href="#">travel</a>
              <a href="#">shopping</a>
              <a href="#">hobbies</a>
            </div>
            {/* End .tagcloud */}
          </div>
          {/* End .widget */}
          <div className="widget widget-text">
            <h3 className="widget-title">About Blog</h3>
            {/* End .widget-title */}
            <div className="widget-text-content">
              <p>
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                euismod dui, pulvinar nunc sapien ornare nisl.
              </p>
            </div>
            {/* End .widget-text-content */}
          </div>
          {/* End .widget */}
        </div>
        {/* End .sidebar */}
      </aside>
      </>
      );
}

export default PostTopic;