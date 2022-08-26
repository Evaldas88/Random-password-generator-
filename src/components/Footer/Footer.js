import React from 'react';

const Footer = () => (
  <div className="main-footer">
      <footer className=" text-center ">
        <div className="container p-1">
          <section className="mb-1">
            <a
              className="btn  btn-secondary btn-floating m-1"
              href="https://github.com/Evaldas88"
              role="button"
            >
             <i className="bi bi-github"></i>
            </a>
          </section>
          </div>
      <div className='text-center p-1 ' >
        &copy; {new Date().getFullYear()} Copyright: Evaldas88
  </div>
  </footer>
  </div>
);


export default Footer;
