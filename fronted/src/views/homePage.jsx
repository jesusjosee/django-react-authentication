import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

const HomePage = () => {

    const {user} = useContext(AuthContext);

    return (
        <section>
            { user && <UserInfo user={user} /> }
            <h1>You are in HomePage</h1>
        </section>
    )
}

export default HomePage;