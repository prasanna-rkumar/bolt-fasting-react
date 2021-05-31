import { useEffect, useRef, useState, useContext } from 'react';
import editPencil from '../../assets/edit-pencil.svg'
import { CurrentFastingContext } from '../../Context/CurrentFastingContext';

const GOALS = ['16:8', '18:9', '20:4'];

const SelectGoal = () => {
  const { goal, setGoal } = useContext(CurrentFastingContext);
  const containerRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef?.current?.contains(event.target)) {
        if (!showMenu) return;
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [containerRef, showMenu])

  return <div ref={containerRef} className=" px-2 pt-1 pb-0.5 bg-white bg-opacity-10 rounded-full relative w-16">
    <div onClick={() => setShowMenu(prev => !prev)} className="flex cursor-pointer justify-start gap-x-2">
      <span className="text-white text-sm ">
        {goal}
      </span>
      <img width={12} height={12} alt="edit" src={editPencil} />
    </div>
    {
      showMenu && (
        <ul className="absolute z-10 rounded-xl top-full mt-1 text-sm left-1/2 transform -translate-x-1/2 bg-white bg-opacity-10 w-16 overflow-hidden">
          {GOALS.map((goal) => (
            <GoalOption key={goal} onClick={() => setGoal(goal)}>
              {goal}
            </GoalOption>
          ))}
        </ul>
      )
    }
  </div>
};

export default SelectGoal;

const GoalOption = ({ children, onClick }) => (
  <li onClick={onClick} className="cursor-pointer pl-2 pt-1 text-gray-300 hover:bg-purple-500 hover:text-white">{children}</li>
);
