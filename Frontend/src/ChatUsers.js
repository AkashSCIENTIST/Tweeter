import "./UserSample.css";
import UserData from "./UserData";
function ChatUsers(props){
    return(
        <><div className="namespace">

            
            <UserName username="Lucy" />
            <UserName username="Gray" />
            <UserName username="Erza" />
            <UserName username="Akash" />
            <UserName username="Lucy" />
            <UserName username="Gray" />
            <UserName username="Erza" />
            <UserName username="Akash" />
            <UserName username="Lucy" />
            <UserName username="Gray" />
            <UserName username="Erza" />
            <UserName username="Akash" />
        </div></>
    );
}

function UserName(props){
    return(<><div className="username">
    <h3>
    &ensp;
    <UserData username={props.username}/>
    {/* &ensp;{props.name}   */}
    </h3>    
</div></>)
}

export default ChatUsers;