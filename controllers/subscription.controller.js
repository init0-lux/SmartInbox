import Event from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
	// implement create subscription logic
	try{
		const subscription = await Subscription.create({
			... req.body,
			user: req.user._id,
		});

		

		res.status(201).json({
			success: true,
			message: "Subscription created successfully",
			data: subscription,
		});
	}
	catch(error){
		console.log(`Create Subscription Error: ${error}`);
		next(error);
	}
};

export const getSubscriptions = async (req, res, next) => {
	//implement get subscriptions
	try{
		// check if the user making the request is same as the user in the token
		// i.e., get own subs
		if(req.user.id !== req.params.id){
			const error = new Error("You are not the owner of this account");
			error.status = 401;
			throw error;
		}

		const subscriptions = await Subscription.find({user: req.params.id});

		res.status(200).json({
			success: true,
			message: "Subscriptions fetched successfully",
			data: subscriptions,
		});
	}
	catch (error) {
		console.log(`Get Subscription Error: ${error}`);
	}
};

export const updateSubscription = async (req, res, next) => {
	// implement update subscription logic
	try{
		const subscription = await Subscription.findById(req.params.id);
		subscription.updateOne(req.body);
		const updatedSubscription = await subscription.save();

		if(!updatedSubscription){
			const error = new Error("Subscription not found");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: "Subscription updated successfully",
			data: updatedSubscription,
		});
	}
	catch(e){
		console.log(`Update Subscription Error: ${e}`);
		next(e);
	}
};

export const deleteSubscription = async (req, res, next) => {
	// implement delete subscription logic
	try{
		const subscription = await Subscription.findById(req.params.id);

		if(!subscription){
			const error = new Error("Subscription not found");
			error.statusCode = 404;
			throw error;
		}

		await subscription.remove();

		res.status(200).json({
			success: true,
			message: "Subscription deleted successfully",
		});
	}
	catch(error){
		console.log(`Delete Subscription Error: ${error}`);
		next(error);
	}
};

export const cancelSubscription = async (req, res, next) => {
	// implement cancel subscription logic
	try{
		const subscription = await Subscription.findById(req.params.id);

		if(!subscription){
			const error = new Error("Subscription not found");
			error.statusCode = 404;
			throw error;
		}

		subscription.status = "cancelled";
		const cancelledSubscription = await subscription.save();

		res.status(200).json({
			success: true,
			message: "Subscription cancelled successfully",
			data: cancelledSubscription,
		});
	}
	catch(error){
		console.log(`Cancel Subscription Error: ${error}`);
		next(error);
	}
};

export const upcomingSubscriptions = async(req, res, next) => {
	// implement upcoming subscription logic
	try{
		const subscriptions = await Subscription.find({
			user: req.user._id,
			status: "active",
			nextBillingDate: { $gte: new Date() },
		});

		res.status(200).json({
			success: true,
			message: "Upcoming Subscriptions fetched successfully",
			data: subscriptions,
		});
	}
	catch(e){
		console.log(`Upcoming Subscription Error: ${e}`);
		next(e);
	}
};

















