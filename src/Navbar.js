"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  BookOpenIcon,
  BellIcon,
  GiftIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { useAuth } from "./AuthProvider";
import logo from "./assets/favicon.png";

const products = [
  {
    name: "Menu",
    description: "Explore our wide variety of dishes",
    href: "/menu",
    icon: ListBulletIcon,
  },
  {
    name: "Online Ordering",
    description: "Order your favorite meals online",
    href: "/order",
    icon: ShoppingCartIcon,
  },
  {
    name: "Table Reservation",
    description: "Reserve a table easily through our system",
    href: "/table",
    icon: BookOpenIcon,
  },
  {
    name: "Special Offers",
    description: "Check out our latest discounts and deals",
    href: "/offers",
    icon: BellIcon,
  },
  {
    name: "Catering Services",
    description: "Perfect for your events and gatherings",
    href: "/catering",
    icon: GiftIcon,
  },
];

const callsToAction = [
  { name: "View Menu", href: "/menu", icon: PlayCircleIcon },
  { name: "Contact Us", href: "/contact", icon: PhoneIcon },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (userLoggedIn && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]); // Trigger this effect whenever user state changes.

  const handleUserIconClick = () => {
    navigate("/dashboard"); // Redirect to the user dashboard
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthProvider
    setIsLoggedIn(false); // Update the state to reflect logged-out status
    localStorage.setItem("isLoggedIn", "false"); // Update local storage
    navigate("/home"); // Redirect after logout
  };

  return (
    <header className="fixed backdrop-blur-lg bg-white/50 top-0 z-50 shadow-md w-screen">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="-m-1.5 p-1.5 hover:opacity-80 transition-opacity duration-300"
          >
            <span className="sr-only">SAC Savory</span>
            <img
              alt="SAC Savory Logo"
              src={logo}
              onError={(e) => (e.target.src = "/fallback-logo.png")}
              className="h-5 sm:h-10 md:h-12 w-auto"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
              Product
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-gray-600 group-hover:text-green-600"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        to={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link to="/features" className="text-sm font-semibold text-gray-900">
            Features
          </Link>
          <Link
            to="/marketplace"
            className="text-sm font-semibold text-gray-900"
          >
            Marketplace
          </Link>
          <Link to="/company" className="text-sm font-semibold text-gray-900">
            Company
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <UserCircleIcon
              className="h-8 w-8 cursor-pointer text-gray-900"
              onClick={handleUserIconClick}
              title="Dashboard"
            />
          ) : (
            <Link to="/login" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">SAC Savory</span>
              <img
                alt="SAC Savory Logo"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure
                  as="div"
                  className="-mx-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <DisclosureButton
                    className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 group-data-[open]:rotate-180"
                      onClick={() => setMobileMenuOpen(false)}
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as={Link}
                        to={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  to="/features"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/marketplace"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  to="/company"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Company
                </Link>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                {user ? (
                  <UserCircleIcon
                    className="h-8 w-8 cursor-pointer text-gray-900"
                    onClick={handleUserIconClick}
                    title="Dashboard"
                  />
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
              {/* Add this for mobile view */}
              <div className="lg:hidden flex items-center gap-x-3">
                {isLoggedIn ? (
                  <UserCircleIcon
                    className="h-8 w-8 cursor-pointer text-gray-900"
                    onClick={handleUserIconClick}
                    title="Dashboard"
                  />
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
