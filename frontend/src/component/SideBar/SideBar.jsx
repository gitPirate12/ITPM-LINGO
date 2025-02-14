import "./SideBar.css";
import { GoHomeFill } from "react-icons/go";
import { FaThreads } from "react-icons/fa6";
import { LuEllipsisVertical } from "react-icons/lu";

const SideBar = () => {
  return (
    <div className="sideBar-container">
      <div className="sideBar-content">
        <ul className="sideBar-list">
          <li className="sideBar-title">
            <h1>ITPM-LINGO.</h1>
          </li>
          <li>
            <a href="/">
              <GoHomeFill />
              Home
            </a>
          </li>
          <li>
            <a href="/myThreads">
              <FaThreads />
              My Threads
            </a>
          </li>
        </ul>
        <button className="thread-btn">Post</button>

        <div className="account-menu">
          <div>
            <p>Aneeq shaffy</p>
            <p className="username">@aneeq123_23ddd</p>
          </div>
          <div className="account-menu-edit-icon">
            <LuEllipsisVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
