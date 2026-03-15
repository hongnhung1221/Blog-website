import "./footer.css";

function Footer() {
  return (
    <footer className="desktop-footer">
      <div className="footer-info">
        <p>
          &copy; 2021-2025 @ Made By{" "}
          <a
            href="https://github.com/hongnhung1221"
            target="_blank"
            rel="noreferrer"
          >
            Hong Nhung
          </a>
        </p>
        <p>
          For any issue kindly send mail to{" "}
          <a type="mail" href="mailto:hongnhung2001thd@gmail.com">
            hongnhung2001thd@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
