import jwt from 'jsonwebtoken';

// Middleware to authenticate admin using JWT
export const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers;
        if (!atoken) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }
        // Verify token
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({ success: false, message: "Invalid token." });
        }
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }
}