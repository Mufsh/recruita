import Operation from "./Operation";
const Home = () => {
  return (
    <>
      <div className="w-full bg-black bg-opacity-75">
        <div className="m-5 p-5 flex justify-center items-center  h-screen">
          <div className="flex justify-center items-center flex-col flex-wrap">
            <div className="text-white text-2xl m-3 p-3 lg:text-4xl font-bold">
              <p> Welcome, Mufassir Azam</p>
            </div>
            <div className="flex justify-center items-center flex-col flex-wrap">
              <Operation route="/add" operation="Add a Candidate" />
              <Operation route="/update" operation="Update Candidate Details" />
              <Operation route="/delete" operation="Delete a Candidate" />
              <Operation route="/viewall" operation="View All Candidates" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
