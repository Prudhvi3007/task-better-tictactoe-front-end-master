import { Routes, Route, Outlet, Link , useLocation } from "react-router-dom";
import { CheckName } from './pages/CheckName';
import { Home } from './pages/Home';
import  FormComponent  from './pages/FormComponent';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="check-name" element={<CheckName />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="form-component" element={<FormComponent /> } />
        </Route>
      </Routes>
  );
}

function Layout() {
  return (
   
    <div>
    <NavMenu />
    <hr />
    <Outlet />
  </div>
  );
}
function NavMenu() {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex">
        <li className="mr-3">
          <NavLink to="/" label="Home" isActive={location.pathname === '/'} />
        </li>
        <li className="mr-3">
          <NavLink to="/check-name" label="Check Name" isActive={location.pathname === '/check-name'} />
        </li>
        <li className="mr-3">
          <NavLink to="/form-component" label="Forms" isActive={location.pathname === '/form-component'} />
        </li>
      </ul>
    </nav>
   
  
  );
}
interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

function NavLink({ to, label, isActive }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-block border border-white rounded hover:border-gray-200 py-1 px-3 ${
        isActive ? 'border-blue-500 bg-blue-500 text-white' : 'text-blue-500 hover:bg-gray-200'
      }`}
    >
      {label}
    </Link>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}