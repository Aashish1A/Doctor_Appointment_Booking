import jwt from 'jsonwebtoken';

// Middleware to authenticate admin using JWT
export const authDoctor = async (req, res, next) => {
    try {
        const {dtoken} = req.headers;
        if (!dtoken) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }
        // Verify token
        const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = decoded.id;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }
}