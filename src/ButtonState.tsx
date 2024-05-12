interface Props {
  name: string;
  onclick: (setState : boolean) => void;
}

const ButtonState = ({ name, onclick}: Props) => {
  const handleClick = async () => {
    onclick(true);
  };

  return (
    <button
      className="w-[90%] h-16 border bg-slate-900 text-white px-2 py-1"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default ButtonState;
