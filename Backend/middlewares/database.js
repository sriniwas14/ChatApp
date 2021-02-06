import { initializeDatabase } from "../utils/database";

export default connectToDatabase = (req, res, next) => {
    initializeDatabase();
}