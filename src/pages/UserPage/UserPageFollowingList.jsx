import style from "./UserPageFollowing.module.css";
import {Link} from "react-router-dom";
import UserPageFollowing from "./UserPageFollowing";

function UserPageFollowingList({friendships}) {

    if (!friendships.length) {
        return (
            <div>
                There is no any following
            </div>
        )
    }

    return (
        <div className={style.divFollowing}>
            { friendships.map((c, index) =>
                <Link
                    key={index}
                    to={'/' + c.user.nickname}
                >
                    <UserPageFollowing
                        username={c.user.nickname}
                        img={c.user.image}
                    />
                </Link>
            )}
        </div>
    );
}

export default UserPageFollowingList;