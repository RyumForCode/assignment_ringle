import { DatePicker } from "./components/DatePicker";
import { Header } from "./components/Header";
import { MainLayout } from "./components/MainLayout";
import { SchedulePanel } from "./components/SchedulePanel";
import { SidePanel } from "./components/SidePanel";

function App() {
  return (
    <>
      <Header />
      <MainLayout>
        <DatePicker />
        <SchedulePanel />
        <SidePanel />
      </MainLayout>
    </>
  );
}

export default App;
