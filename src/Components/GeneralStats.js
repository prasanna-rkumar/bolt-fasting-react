import { useQuery } from '../hooks/axios-query'

const GeneralStats = () => {
  const [{ data }] = useQuery('/stats');
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 w-full bg-white rounded-3xl shadow-xl justify-items-center gap-y-8 py-4 items-center my-16" style={{ minHeight: 180 }}>
      { data &&
        Object.keys(data).map((key, index) => {
          return (
            <div key={key}>
              <div className="text-lg text-gray-500 font-medium">{key}</div>
              <div className="text-4xl font-medium text-center md:text-left">{data[key]}</div>
            </div>
          )
        })
      }
    </div>
  );
};

export default GeneralStats;
