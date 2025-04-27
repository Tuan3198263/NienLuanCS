<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <h5>About VietnamWorks</h5>
          <ul class="list-unstyled">
            <li><a href="#"> About Us </a></li>
            <li><a href="#"> Contact Us </a></li>
            <li><a href="#"> FAQ </a></li>
            <li><a href="#"> Terms Of Use </a></li>
            <li><a href="#"> Privacy Statement </a></li>
            <li>
              <a href="#">Operation Regulation Of VietnamWorks E-Commerce</a>
            </li>
            <li><a href="#"> Trading Floor </a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Tools</h5>
          <ul class="list-unstyled">
            <li><a href="#"> My Account </a></li>
            <li><a href="#"> My Resumes </a></li>
            <li><a href="#"> My Jobs </a></li>
            <li><a href="#"> My Job Alerts </a></li>
            <li><a href="#"> Career Advice </a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Download App</h5>
          <div class="app-links">
            <a href="#">
              <img
                alt="Download on the App Store"
                src="https://placehold.co/150x50?text=App+Store"
              />
            </a>
            <a href="#">
              <img
                alt="Get it on Google Play"
                src="https://placehold.co/150x50?text=Google+Play"
              />
            </a>
          </div>
        </div>
        <div class="col-md-3">
          <h5>Subscribe to Us</h5>
          <div class="social-icons">
            <a class="linkedin" href="#">
              <i class="fab fa-linkedin"></i>
            </a>
            <a class="facebook" href="#">
              <i class="fab fa-facebook"></i>
            </a>
          </div>
          <h5>Verified By</h5>
          <div class="verified">
            <img
              alt="Verified Badge"
              src="https://placehold.co/100x50?text=Verified+Badge"
            />
          </div>
          <div class="zalo">
            <img alt="Zalo" src="https://placehold.co/50x50?text=Zalo" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="copyright">
            Copyright © Navigos Group Vietnam Joint Stock Company
            <br />
            Floor 20, E.Town Central, 11 Doan Van Bo Street, Ward 13 District 4,
            Ho Chi Minh City, Vietnam
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterCompany",
};
</script>

<style scoped>
.footer {
  background-color: #e0e0e0;
  padding: 20px 0;
}
.footer a {
  color: #333;
  text-decoration: none;
}
.footer a:hover {
  text-decoration: underline;
}
.footer .col-md-3 {
  margin-bottom: 20px;
}
.footer .app-links img {
  width: 150px;
  margin-right: 10px;
}
.footer .social-icons a {
  font-size: 24px;
  margin-right: 10px;
  color: #0077b5; /* LinkedIn color */
}
.footer .social-icons a.facebook {
  color: #3b5998; /* Facebook color */
}
.footer .verified img {
  width: 100px;
}
.footer .zalo img {
  width: 50px;
}
.footer .copyright {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
</style>
