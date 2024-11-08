import "./App.css";
import DrapAndDrop from "./components/DrapAndDrop";

const initialData = {
  Todo: [
    "Design UI mockups",
    "Set up project repository",
    "Write unit test",
    "Integrate payment gateway",
  ],
  "In Progress": ["Develop authentication flow", "Implement responsive design"],
  Completed: [
    "Set up CI/CD pipeline",
    "Conduct code reviews",
    "Deploy initial version to staging",
  ],
};

function App() {
  return (
    <>
      <DrapAndDrop initialData={initialData} />
    </>
  );
}

export default App;
