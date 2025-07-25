import './Header.css';

interface NavButtonProps {
  text: string;
  onClick: () => void;
}

const NavButton = ({ text, onClick }: NavButtonProps) => {
  return (
    <button className="nav-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default NavButton;