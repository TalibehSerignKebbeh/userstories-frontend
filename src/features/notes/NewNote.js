// import { useSelector } from 'react-redux'
// import { selectAllUsers } from '../users/usersApiSlice'
// import {} from '../users/usersApiSlice'
import { PulseLoader } from 'react-spinners'
import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
const NewNote = () => {
    const { users } = useGetUsersQuery('', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id=>data?.entities[id])
        })
    })

    if(!users?.length) return <PulseLoader color={'#fff'} />

    const content =  <NewNoteForm users={users} />

    return content
}
export default NewNote