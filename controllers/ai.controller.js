import { GoogleGenerativeAI } from '@google/generative-ai';
import Event from '../models/event.model.js';
import { google } from 'googleapis';

import { GEMINI_API_KEY } from '../config/env.js';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const analyzeEmail = async (req, res, next) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

	const prompt = `I'm a ${req.user.year_of_study} year ${req.user.subject} student. Analyze this email: ${req.body.emailBody}. 
Respond with PURE JSON (no markdown) in this exact format:
{
  "summary": "3-5 word summary",
  "relevancy": "Yes/No",
  "reason": "<15 char reason>", 
  "event_details": {
    "title": "string",
    "date": "ISO string",
    "location": "string"
  }
}
Relevancy rules:
- Yes: Directly relates to ${req.user.subject}
- No: Unrelated or different field`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response before parsing
    const cleanedText = text.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(cleanedText);
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    next(error);
  }
};

export const createCalendarEvent = async (req, res, next) => {
  try {
    const { eventData } = req.body;
    const user = req.user;
    
    // Save to database
    const event = await Event.create({
      ...eventData,
      user: user._id
    });

    // Sync with Google Calendar if enabled
    if (user.calendarIntegration?.google) {
      const calendar = google.calendar({ version: 'v3' });
      await calendar.events.insert({
        calendarId: 'primary',
        auth: user.calendarIntegration.google.accessToken,
        resource: {
          summary: event.title,
          start: { dateTime: event.startDateTime },
          end: { dateTime: event.endDateTime },
          description: event.description
        }
      });
    }

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};
