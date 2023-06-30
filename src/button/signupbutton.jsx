import {MdFollowTheSigns} from 'react-icons/md'

const SignupButton = () => {
  return (
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      <MdFollowTheSigns className="inline-block mr-2" />
      Sign Up
    </button>
  );
};

export default SignupButton;
              