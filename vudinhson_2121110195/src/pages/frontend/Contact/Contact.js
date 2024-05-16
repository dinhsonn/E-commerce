import { useState } from "react";
import ContactServices from "../../../services/ContactServices"; 
import { useUser } from '../../../services/UserContext';
import Swal from "sweetalert2";
import Header from "../../../components/Public/Header";
import Footer from "../../../components/Public/Footer";
function Contact() {
  document.title="Contact";
  const [contacts, setContacts] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [massage, setMassage] = useState('');
  const { loggedInUser } = useUser();
  console.log('LoggedInUser:', loggedInUser);
    const handleContact = async (event) => {
    event.preventDefault();
  
    try {
      if (loggedInUser) {
        const response = await ContactServices.create({
          userId: loggedInUser,
          name: name,
          email: email,
          phone: phone,
          title: subject,  
          content: massage,
          replayId: 1,
          createdAt: "2023-12-30T07:54:31.000+00:00",
          updatedAt: null,
          createdBy: 1,
          updatedBy: null,
          status: 1,
        });
        setContacts(response);
        Swal.fire(
          'Contact Successfully!',
          'You have successfully contacted your account!',
          'success'
        );
        
        console.log('Contact successful', response);
      } else {
        console.error('User not logged in');
      }
    } catch (error) {
      console.error('Error creating contact:', error);
      window.alert('An error occurred while creating contact!');
    }
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleMessageChange = (event) => {
    setMassage(event.target.value);
  };
    return ( 
        <>
        <Header />
  <div className="page-wrapper">
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Pages</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact us
            </li>
          </ol>
        </div>
        {/* End .container */}
      </nav>
      {/* End .breadcrumb-nav */}
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <h2 className="title mb-1">Contact Information</h2>
              {/* End .title mb-2 */}
              <p className="mb-3">
                Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                dapibus eu, fermentum et, dapibus sed, urna.
              </p>
              <div className="row">
                <div className="col-sm-7">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-map-marker" />
                        70 Washington Square South New York, NY 10012, United
                        States
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <a href="tel:#">+92 423 567</a>
                      </li>
                      <li>
                        <i className="icon-envelope" />
                        <a href="mailto:#">info@Molla.com</a>
                      </li>
                    </ul>
                    {/* End .contact-list */}
                  </div>
                  {/* End .contact-info */}
                </div>
                {/* End .col-sm-7 */}
                <div className="col-sm-5">
                  <div className="contact-info">
                    <h3>The Office</h3>
                    <ul className="contact-list">
                      <li>
                        <i className="icon-clock-o" />
                        <span className="text-dark">Monday-Saturday</span>{" "}
                        <br />
                        11am-7pm ET
                      </li>
                      <li>
                        <i className="icon-calendar" />
                        <span className="text-dark">Sunday</span> <br />
                        11am-6pm ET
                      </li>
                    </ul>
                    {/* End .contact-list */}
                  </div>
                  {/* End .contact-info */}
                </div>
                {/* End .col-sm-5 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .col-lg-6 */}
            <div className="col-lg-6">
              <h2 className="title mb-1">Got Any Questions?</h2>
              {/* End .title mb-2 */}
              <p className="mb-2">
                Use the form below to get in touch with the sales team
              </p>
              <form onSubmit={handleContact} action="#" className="contact-form mb-3">
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cname" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Name *"
                      required=""
                      onChange={handleNameChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label htmlFor="cemail" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Email *"
                      required=""
                      onChange={handleEmailChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cphone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Phone"
                      onChange={handlePhoneChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label htmlFor="csubject" className="sr-only">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="csubject"
                      placeholder="Subject"
                      onChange={handleSubjectChange}
                    />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <label htmlFor="cmessage" className="sr-only">
                  Message
                </label>
                <textarea
                  className="form-control"
                  cols={30}
                  rows={4}
                  id="cmessage"
                  required=""
                  placeholder="Message *"
                  defaultValue={""}
                  onChange={handleMessageChange}
                />
                <button
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                  <span>SUBMIT</span>
                  <i className="icon-long-arrow-right" />
                </button>
              </form>
              {/* End .contact-form */}
            </div>
            {/* End .col-lg-6 */}
          </div>
          {/* End .row */}
          <hr className="mt-4 mb-5" />
          <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Our Stores</h2>
            {/* End .title text-center mb-2 */}
            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img src="assets/images/stores/img-1.jpg" alt="image" />
                      </figure>
                      {/* End .store-media */}
                    </div>
                    {/* End .col-xl-6 */}
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Wall Street Plaza</h3>
                        {/* End .store-title */}
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        {/* End .store-subtitle */}
                        <div>Monday - Saturday 11am to 7pm</div>
                        <div>Sunday 11am to 6pm</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                      {/* End .store-content */}
                    </div>
                    {/* End .col-xl-6 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .store */}
              </div>
              {/* End .col-lg-6 */}
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img src="assets/images/stores/img-2.jpg" alt="image" />
                      </figure>
                      {/* End .store-media */}
                    </div>
                    {/* End .col-xl-6 */}
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">One New York Plaza</h3>
                        {/* End .store-title */}
                        <address>88 Pine St, New York, NY 10005, USA</address>
                        <div>
                          <a href="tel:#">+1 987-876-6543</a>
                        </div>
                        <h4 className="store-subtitle">Store Hours:</h4>
                        {/* End .store-subtitle */}
                        <div>Monday - Friday 9am to 8pm</div>
                        <div>Saturday - 9am to 2pm</div>
                        <div>Sunday - Closed</div>
                        <a href="#" className="btn btn-link" target="_blank">
                          <span>View Map</span>
                          <i className="icon-long-arrow-right" />
                        </a>
                      </div>
                      {/* End .store-content */}
                    </div>
                    {/* End .col-xl-6 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .store */}
              </div>
              {/* End .col-lg-6 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .stores */}
        </div>
        {/* End .container */}
        <div id="map" />
        {/* End #map */}
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

export default Contact;