import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
	// implement middleware logic
	try{
		const decision = await aj.protect(req, {requested: 1});
	
		if (decision.isDenied()){
			if(decision.reason.isRateLimit()){
				return res.status(429).json({
					success: false,
					message: "Rate Limit Exceeded",
					error: decision.reason.message,
				});
			}

			if(decision.reason.isBot()){
				return res.status(403).json({
					success: false,
					message: "Bot detected",
					error: decision.reason.message,
				});
			}
			
			return res.status(403).json({
				success: false,
				message: "Access Denied",
				error: decision.reason.message,
			});
		}

		next();
	}
	catch(error) {
		console.log(`ArcJet Middleware Error: ${error}`);
		next(error);
	}
}

export default arcjetMiddleware;
