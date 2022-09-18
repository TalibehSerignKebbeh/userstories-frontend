import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { selectNoteById } from './notesApiSlice'
// import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { PulseLoader } from 'react-spinners'
import useAuth from '../../hooks/useAuth'

const EditNote = () => {
    const { id } = useParams()
    const {username, isAdmin, isManager } = useAuth();

    // const note = useSelector(state => selectNoteById(state, id))
    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        })
    })
    // const users = useSelector(selectAllUsers)
    const { users } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id=>data?.entities[id])
        })
    })

    if (!note || !users?.length) return <PulseLoader color={'#fff'}  />
    if ((!isAdmin && !isManager) && note?.username !== username) {
        return <p className='errmsg'>No Access</p>
    };

    const content = note && users ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>

    return content
}
export default EditNote