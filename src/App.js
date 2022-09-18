import { Routes, Route } from 'react-router-dom'
// import Layout from './components/Layout'
import Layout from './componenst/Layout';
// import Public from './components/Public'
import Public from './componenst/Public';
// import Login from './features/auth/Login';
import Login from './features/auth/Login';
// import DashLayout from './components/DashLayout'
import DashLayout from './componenst/DashLayout';
// import Welcome from './features/auth/Welcome'
import Welcome from './features/auth/Welcome';
// import NotesList from './features/notes/NotesList'
import NotesList from './features/notes/NotesList';
// import UsersList from './features/users/UsersList'
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditNote from './features/notes/EditNote';
import NewNote from './features/notes/NewNote';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';
import useTitle from './hooks/useTitle';
function App() {

  useTitle("Dan D Repairs")
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth alloweRoles={[...Object.values(ROLES)]} />} >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
                <Route element={<RequireAuth alloweRoles={[...Object.values(ROLES)]} />} >

                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
              </Route>{/* End Dash */}
            </Route>
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default App;