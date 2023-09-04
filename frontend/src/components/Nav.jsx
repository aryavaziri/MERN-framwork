"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import { Context } from "@app/Provider";
import Menu from "@components/Menu";
import Logo from "@/../public/LOGO.svg";
import { HiSun } from "react-icons/hi2";
import { HiMoon } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { headers } from "../../next.config";
import { useSearchParams } from "next/navigation";
// import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const newToken = useSearchParams().get("token");
  const router = useRouter();
  useEffect(() => {
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
      router.push("/");
    }
    const token = localStorage.getItem("accessToken");
    if (token) {
      validate(token);
    }
  }, []);
  const myContext = useContext(Context);
  console.log(myContext);
  const validate = async (token) => {
    await fetch("http://localhost:3000/auth", {
      headers: { Authorization: `bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          myContext.setIsAuth(true);
          return res.json();
        }
        myContext.setIsAuth(false);
        localStorage.removeItem("accessToken");
        return res.text();
      })
      .then((res) => {
        console.log(res);
        res.user && myContext.setUser(res.user);
      });
  };

  const login = () => {
    window.open("http://localhost:3000/login/google", "_self");
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    myContext.setIsAuth(false);
  };

  return (
    <div>
      <div className="flex justify-between h-[40px]">
        <div>
          <Link
            href={`/`}
            // className={`flex h-full ${myContext.menu ? "mt-0" : "mt--2"}`}
          >
            <Image
              className={`h-full py-1 w-min object-fill`}
              alt="LOGO"
              src={Logo}
            />
          </Link>
        </div>
        <div className="flex gap-4 h-full">
          {!myContext?.isAuth ? (
            <button
              onClick={() => login()}
              className="h-auto px-2 my-1 flex duration-300 justify-center items-center rounded border border-slate-900 font-bold"
            >
              LOGIN
            </button>
          ) : (
            myContext.user?.profileImg && (
              <div
                className="h-auto my-1 aspect-square cursor-pointer"
                onClick={() => {
                  setToggle((prev) => !prev);
                }}
              >
                <Image
                  className="h-full w-full rounded-full"
                  src={myContext.user?.profileImg}
                  alt="IMG"
                  width={30}
                  height={30}
                />
                {toggle && (
                  <button
                    onClick={() => logout()}
                    className=" bg-slate-200 absolute h-auto px-2 my-1 flex duration-300 justify-center items-center rounded border border-slate-900"
                  >
                    Logout
                  </button>
                )}
              </div>
            )
          )}

          <button
            className="text-3xl relative h-full aspect-square"
            onClick={myContext.toggleTheme}
          >
            <HiSun
              className={`${
                myContext.theme === "dark" ? `opacity-0` : `opacity-100`
              } absolute top-[5px]`}
            />
            <HiMoon
              className={`${
                myContext.theme === "light" ? `opacity-0` : `opacity-100`
              } absolute top-[5px]`}
            />
          </button>
          <button
            className=""
            onClick={myContext.toggleMenu}
          >
            <Menu />
          </button>
        </div>
      </div>
      <div
        className={`w-full px-12 md:px-32 lg:px-52 menu-list duration-500 overflow-hidden`}
      >
        <ul className="w-full">
          <li
            onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6 mt-8" : "my-0"
            } ${
              myContext.title === "Welcome" ? "text-orange-400" : ""
            }  font-extrabold`}
          >
            <Link
              className={`${myContext.menu ? "delay-100" : "delay-300"} `}
              href={`/`}
            >
              HOME
            </Link>
          </li>
          <li
            onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6" : "my-0"
            } ${
              myContext.title === "Projects" ? "text-orange-400" : ""
            }  font-extrabold`}
          >
            <Link
              className={`${myContext.menu ? "delay-200" : "delay-200"} `}
              href={`/projects`}
            >
              PROJECTS
            </Link>
          </li>
          <li
            onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6" : "my-0"
            } ${
              myContext.title === "About" ? "text-orange-400" : ""
            }  font-extrabold`}
          >
            <Link
              className={`${myContext.menu ? "delay-300" : "delay-100"} `}
              href={`/about`}
            >
              ABOUT
            </Link>
          </li>
          <li
            onClick={() => menuHandler()}
            className={`text-5xl md:text-6xl ${
              myContext.menu ? "menu-item-show my-6 mb-[150vh]" : "my-0"
            } ${
              myContext.title === "Contact" ? "text-orange-400" : ""
            }  font-extrabold`}
          >
            <Link
              className={`${myContext.menu ? "delay-400" : ""} `}
              href={`/contact`}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
