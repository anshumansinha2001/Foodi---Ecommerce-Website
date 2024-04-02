import {
  FaGithub,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#EEEEEE]">
      <footer className="footer xl:px-24 py-10 px-4 text-base-content ">
        <aside>
          <img src="/logo.png" alt="" />
          <p className="my-3 md:w-40">
            Savor the artistry where every dish is a culinary masterpiece
          </p>
        </aside>
        <nav>
          <header className="footer-title text-black">Useful links</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Events</a>
          <a className="link link-hover">Blogs</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <header className="footer-title">Main Menu</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Offers</a>
          <a className="link link-hover">Menus</a>
          <a className="link link-hover">Reservation</a>
        </nav>
        <nav>
          <header className="footer-title">Contact Us</header>
          <a className="link link-hover">anshumansinha2001@email.com</a>
          <a className="link link-hover">+91 9999999998</a>
          <a className="link link-hover">Bangaluru, india</a>
        </nav>
      </footer>

      <hr />

      <footer className="footer items-center xl:px-24 px-4 py-4 mt-2">
        <aside className="items-center grid-flow-col">
          <p>Copyright © 2024 Anshuman Sinha | All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            href="https://www.linkedin.com/in/anshumansinha2001"
            target="_blank"
            className="w-auto p-2 rounded-full border border-black cursor-pointer"
          >
            <FaLinkedin className="text-2xl hover:text-green" />
          </a>
          <a
            href="https://github.com/anshumansinha2001"
            target="_blank"
            className="p-2 rounded-full border border-black cursor-pointer"
          >
            <FaGithub className="text-2xl hover:text-green" />
          </a>
          <a
            href="https://instagram.com/theanshumansinha"
            target="_blank"
            className="p-2 rounded-full border border-black cursor-pointer"
          >
            <FaInstagramSquare className="text-2xl hover:text-green" />
          </a>
          <a
            href="https://twitter.com/ianshumansinha"
            target="_blank"
            className="p-2 rounded-full border border-black cursor-pointer"
          >
            <FaTwitter className="text-2xl hover:text-green" />
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
