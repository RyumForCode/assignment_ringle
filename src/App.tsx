import { DatePicker } from "./components/DatePicker";
import { Header } from "./components/Header";
import { MainLayout } from "./components/MainLayout";
import { SidePanel } from "./components/SidePanel";

function App() {
  return (
    <div>
      <Header />
      <MainLayout>
        <DatePicker />
        <SidePanel />
      </MainLayout>
    </div>
  );
}

export default App;
