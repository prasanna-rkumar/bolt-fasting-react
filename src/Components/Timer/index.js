import SelectGoal from "./SelectGoal"
import Progress from "./Progress"
import editPencil from '../../assets/edit-pencil.svg'

const Timer = () => {
  return (
    <div className="primary-bg rounded-3xl shadow-xl w-full flex flex-col items-center justify-between p-4" style={{
      maxWidth: 360,
      minHeight: 360
    }}>
      <SelectGoal />
      <div className="w-52 h-52 relative">
        <Progress elapsedPercentage={1} />
        <div className="flex flex-col absolute text-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-xs font-bold text-white text-opacity-50">Fasting Time</span>
          <span className="text-2xl text-white font-bold">00:00:00</span>
        </div>
        <button className="outline-none text-purple-900 w-14 bg-red-200 rounded-full px-1 py-1 text-xs font-bold absolute bottom-4 left-1/2 transform -translate-x-1/2 ">
          Start
        </button>
      </div>
      <div className="flex flex-row justify-around w-full">
        {
          [
            {label: 'Started', value: '14 May, 9:45 PM'},
            {label: 'Fast Ending', value: 'Today, 1:45 PM'}
          ].map(({value, label}, index) => (
            <Timing key={label} value={value} label={label}>
              { index === 0 && (
                <button>
                  <img className="inline ml-1 mb-1" width={14} height={14} alt="edit" src={editPencil} />
                </button>
              ) }
            </Timing>
          ))
        }
      </div>
    </div>
  );
};

const Timing = ({ label, value, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-white font-bold text-opacity-50 text-xs uppercase">{label}</span>
    <span className="text-white text-xs">{value}{children}</span>
  </div>
);

export default Timer;
