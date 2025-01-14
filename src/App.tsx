import { useState } from "react";
import "./App.css";
import ComponentBottom from "./components/ComponentBottom/ComponentBottom";
import { Combobox } from "@consta/uikit/Combobox";
import { presetGpnDefault, Theme } from "@consta/uikit/Theme";

type Item = {
  label: string;
  id: number;
};

const items: Item[] = [
  {
    label: "Первый",
    id: 1,
  },
  {
    label: "Второй",
    id: 2,
  },
  {
    label: "Третий",
    id: 3,
  },
];

function App() {
  const [value, setValue] = useState<Item | null>();
  return (
    <>
      <ComponentBottom />
      <Theme preset={presetGpnDefault}>
        <Combobox
          items={items}
          value={value}
          onChange={setValue}
          placeholder="Выберите нужный элемент из списка"
        />
      </Theme>
    </>
  );
}

export default App;
