export const apiBaseUrl =
    process.env.REACT_APP_API_PATH === "dev"
        ? "http://localhost:9000/"
        // change to hugfugee deployment path
        : "https://nothingtotrash-backend.herokuapp.com/";