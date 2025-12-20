import { createContext, useContext, useState, ReactNode } from "react";

export interface ReportedItem {
  id: string;
  type: "lost" | "found";
  itemName: string;
  description: string;
  location: string;
  date: string;
  time: string;
  reporterName: string;
  image?: string;
  createdAt: string;
}

interface ReportedItemsContextType {
  items: ReportedItem[];
  addItem: (item: ReportedItem) => void;
  removeItem: (id: string) => void;
}

const ReportedItemsContext = createContext<ReportedItemsContextType | undefined>(undefined);

export const ReportedItemsProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ReportedItem[]>([]);

  const addItem = (item: ReportedItem) => {
    setItems((prev) => [item, ...prev]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ReportedItemsContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </ReportedItemsContext.Provider>
  );
};

export const useReportedItems = () => {
  const context = useContext(ReportedItemsContext);
  if (!context) {
    throw new Error("useReportedItems must be used within a ReportedItemsProvider");
  }
  return context;
};
