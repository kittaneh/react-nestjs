import React, { createContext, useContext, useState } from "react";

const SkillsUIContext = createContext();

export function useSkillsUIContext() {
    return useContext(SkillsUIContext);
}

export const SkillsUIConsumer = SkillsUIContext.Consumer;

export function SkillsUIProvider({ children }) {

    const [ids, setIds] = useState([]);
    const [showAddSkillsDialog, setShowAddSkillsDialog] = useState(false);

    const value = {
        ids,
        setIds,
        showAddSkillsDialog,
        setShowAddSkillsDialog,
    };

    return (
        <SkillsUIContext.Provider value={value}>
            {children}
        </SkillsUIContext.Provider>
    );
}
