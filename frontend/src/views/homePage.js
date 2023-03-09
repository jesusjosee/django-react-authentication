import {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import UserInfo from '../components/UserInfo';

const Home = () => {
    const {user} = useContext(AuthContext)

    return(
        <section>
            {user && <UserInfo user={user}/>}
        </section>
    )
}

export default Home;