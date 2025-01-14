import Logo from "../atoms/Logo";
import NavLinks from "../molecules/NavLinks";
import AuthButtons from "../molecules/AuthButtons";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-3">
              <Logo />
              <span className="hidden sm:block text-gray-600 font-medium">
                Tu hogar lejos de casa
              </span>
            </a>
          </div>

          <div className="flex items-center space-x-8">
            <NavLinks />
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
