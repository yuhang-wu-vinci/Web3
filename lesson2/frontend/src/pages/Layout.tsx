import { NavLink, Outlet } from 'react-router';

function Layout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #ccc' }}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/expenses" end>
          Expenses
        </NavLink>
        <NavLink to="/expenses/new">
          Add an expense
        </NavLink>
      </nav>
      <main style={{ padding: '1rem 0' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;