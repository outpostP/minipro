import { TbDoorEnter } from 'react-icons/tb';

const LoginButton = () => {
  return (
    <>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
      <TbDoorEnter className="inline-block mr-2" />
      Login
    </button>
    
    </>
  );
};

export default LoginButton;
