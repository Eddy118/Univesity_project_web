<template>
  <div class="footer-container">
    <div class="social-media">
      <div class="social-media-text">Get connected with us on social networks:</div>
      <div class="social-media-icons">
        <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-google"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
        <a href="#" class="social-icon"><i class="fab fa-github"></i></a>
      </div>
    </div>

    <div class="links-section">
      <div class="links-column">
        <h6 class="footer-title">Education Learners</h6>
        <div class="divider"></div>
        <p>
          Education Learners aims to transform the educational experience by leveraging cutting-edge
          AI and machine learning technologies to provide students and educators with highly
          accurate, personalized, and efficient learning solutions. Our vision is to create a
          dynamic and adaptive learning environment where every user benefits from tailored content,
          predictive insights, and real-time feedback, ultimately making education more accessible,
          engaging, and effective.
        </p>
      </div>

      <div class="links-column">
        <h6 class="footer-title">Contact</h6>
        <div class="divider"></div>
        <p><i class="fas fa-home"></i> Keele University</p>
        <p><i class="fas fa-envelope"></i> info@keele.com</p>
        <p><i class="fas fa-phone"></i> + 01 234 567 88</p>
        <p><i class="fas fa-print"></i> + 01 234 567 89</p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-copyright">
      © 2024 Copyright: <a href="#" class="footer-link">Education Learners</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.footer-container {
  background-color: #c89666;
  color: white;
  padding: 2rem 1rem;
  margin-top: 50px;
  margin-bottom: 50px;
}

.social-media {
  background-color: #12343b;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-media-text {
  margin: 0;
}

.social-media-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  color: white;
  font-size: 1.25rem;
}

.links-section {
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;
}

.links-column {
  flex: 1;
  min-width: 200px;
  margin-bottom: 1rem;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.divider {
  width: 60px;
  height: 2px;
  background-color: black;
  margin-bottom: 1rem;
}

.footer-link {
  color: white;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-copyright {
  text-align: center;
  margin-top: 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1rem;
}

.footer-copyright a {
  color: white;
  text-decoration: none;
}

.footer-copyright a:hover {
  text-decoration: underline;
}
</style>
