function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-white">About Us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a className="hover:text-white transition-colors" href="/about">
                  Our Story
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a className="hover:text-white transition-colors" href="/contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="/faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex justify-center gap-4 md:justify-start">
              <a className="text-gray-400 hover:text-white transition-colors" href="#"><svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.44c-3.115 0-3.486.011-4.694.067-2.615.119-3.876 1.379-3.995 3.995C3.217 8.796 3.206 9.167 3.206 12s.011 3.204.067 4.412c.119 2.615 1.38 3.876 3.995 3.995 1.208.056 1.579.067 4.694.067s3.486-.011 4.694-.067c2.615-.119 3.876-1.38 3.995-3.995.056-1.208.067-1.579.067-4.694s-.011-3.486-.067-4.694c-.119-2.615-1.38-3.876-3.995-3.995C15.486 3.614 15.115 3.603 12 3.603z"></path><path d="M12 7.272a4.728 4.728 0 100 9.456 4.728 4.728 0 000-9.456zm0 7.728a3 3 0 110-6 3 3 0 010 6z"></path><path d="M16.965 7.904a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"></path></svg></a>
              <a className="text-gray-400 hover:text-white transition-colors" href="#"><svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd"></path></svg></a>
              <a
                className="text-gray-400 hover:text-white transition-colors"
                href="#"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12.019c0 4.438 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.019C22 6.477 17.523 2 12 2z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p>© 2025 Yansa Auto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;