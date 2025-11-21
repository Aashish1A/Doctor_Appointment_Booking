import jwt from 'jsonwebtoken';

// Middleware to authenticate user using JWT
export const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        if (!req.body) req.body = {};
        req.body.userId = decoded.id;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }
}