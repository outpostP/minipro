import { useSelector } from 'react-redux';

const UserInfo = () => {
    const username = useSelector((state) => state.AuthReducer.username);
    const email = useSelector((state) => state.AuthReducer.email);
    const phone = useSelector((state) => state.AuthReducer.phone);
    
    return (
      <div>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
    );
  };

  export default UserInfo
