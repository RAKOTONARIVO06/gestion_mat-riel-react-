import { Outlet, Link } from "react-router-dom";
const layout = () => {
  return (
    <>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/users">users</Link>
          </li> */} 
          <li>
            <Link to="/materiels">Materiels</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default layout;