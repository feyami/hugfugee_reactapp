import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useShortCuts = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey  && event.key === "q") {
                navigate("/projects");
            } else if (event.ctrlKey && event.key === "c") {
                navigate("/contacts");
            } else if (event.ctrlKey && event.key === "u") {
                navigate("/customers");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [navigate]);
};


 

 
