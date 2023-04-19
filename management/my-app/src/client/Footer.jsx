import "./App.css";

function Footer() {
  return (
    <div class="footer">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <div class="container">
        <span className="icon">
          <a href="https://www.twitter.com">
            <i class="fab fa-twitter"></i>
          </a>
        </span>
        <span className="icon">
          <a href="https://www.facebook.com">
            <i class="fab fa-facebook-f"></i>
          </a>
        </span>
        <span className="icon">
          <a href="https://www.youtube.com">
            <i class="fab fa-youtube"></i>
          </a>
        </span>
        <span className="icon">
          <a href="https://www.instagram.com">
            <i class="fab fa-instagram"></i>
          </a>
        </span>
      </div>{" "}
    </div>
  );
}

export default Footer;
