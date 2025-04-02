import Event from "../models/event.model.js";

export const createEvent = async (req, res, next) => {
	// implement create subscription logic
	try{
		const even = await Event.create({
			... req.body,
			user: req.user._id,
		});

		

		res.status(201).json({
			success: true,
			message: "Subscription created successfully",
			data: even,
		});
	}
	catch(error){
		console.log(`Create Subscription Error: ${error}`);
		next(error);
	}
};

export const getEvents = async (req, res, next) => {
	//implement get subscriptions
	try{
		// check if the user making the request is same as the user in the token
		// i.e., get own subs
		if(req.user.id !== req.params.id){
			const error = new Error("You are not the owner of this account");
			error.status = 401;
			throw error;
		}

		const events = await Event.find({ 
		user: req.user._id,
		relevancy: 'Yes'
		}).sort('startDateTime');

		res.status(200).json({
			success: true,
			message: "Subscriptions fetched successfully",
			data: events,
		});
	}
	catch (error) {
		console.log(`Get Subscription Error: ${error}`);
	}
};

export const updateEvent = async (req, res, next) => {
	// implement update subscription logic
	try{
		const even = await Event.findById(req.params.id);
		Event.updateOne(req.body);
		const updatedEvent = await Event.save();

		if(!updatedEvent){
			const error = new Error("Event not found");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: "Event updated successfully",
			data: updatedEvent,
		});
	}
	catch(e){
		console.log(`Update Subscription Error: ${e}`);
		next(e);
	}
};

export const deleteEvent = async (req, res, next) => {
	// implement delete subscription logic
	try{
		const even = await Event.findById(req.params.id);

		if(!even){
			const error = new Error("Subscription not found");
			error.statusCode = 404;
			throw error;
		}

		await Event.findByIdAndDelete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Event deleted successfully",
		});
	}
	catch(error){
		console.log(`Delete Event Error: ${error}`);
		next(error);
	}
};

export const cancelEvent = async (req, res, next) => {
	// implement cancel subscription logic
	try{
		const even = await Event.findById(req.params.id);

		if(!even){
			const error = new Error("Subscription not found");
			error.statusCode = 404;
			throw error;
		}

		even.status = "cancelled";
		const cancelledEvent = await even.save();

		res.status(200).json({
			success: true,
			message: "Event cancelled successfully",
			data: cancelledEvent,
		});
	}
	catch(error){
		console.log(`Cancel Subscription Error: ${error}`);
		next(error);
	}
};

export const upcomingEvents = async(req, res, next) => {
	// implement upcoming subscription logic
	try{
		const even = await Event.find({
			user: req.user._id,
			status: "active",
			nextBillingDate: { $gte: new Date() },
		});

		res.status(200).json({
			success: true,
			message: "Upcoming Events fetched successfully",
			data: even,
		});
	}
	catch(e){
		console.log(`Upcoming Subscription Error: ${e}`);
		next(e);
	}
};
