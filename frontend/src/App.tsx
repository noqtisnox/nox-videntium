import StudentCard from "@components/StudentCard";

function App() {
  return (
    <>
      <StudentCard id={'1'} submissionStatus={'none'} />
      <StudentCard id={'2'} submissionStatus={'submitted'} />
      <StudentCard id={'3'} submissionStatus={'late'} />
      <StudentCard id={'4'} submissionStatus={'graded'} />
    </>
  );
}

export default App;
