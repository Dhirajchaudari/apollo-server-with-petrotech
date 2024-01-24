import { Link } from "react-router-dom"
export const Home = () => {
    return (
        <div>
            <h1>Home page</h1>

            <div className="home_btn">
                <Link to={"/user"}>
                    <button>User</button>
                </Link>
                <Link to={"/moview"}>
                <button>Moview</button>
            </Link>
            </div>
        </div>
    )
}