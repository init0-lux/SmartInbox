import { config } from 'dotenv';

// this will extract all the environment variables
//config( { path: '.env' } );


// this will take env vars depending on whether the build is
// production or dev
config( { path : `.env.${process.env.NODE_ENV || 'development'}.local`} );
//config( { path : `.env.'development'.local`} );
//config({ path: ".env.development.local" });

// now you can export the port from the env file
export const {
	PORT, NODE_ENV, 
	DB_URI,
	JWT_SECRET, JWT_EXPIRES_IN,
	ARCJET_KEY, ARCJET_ENV,
	QSTASH_URL, QSTASH_KEY,
	QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY,
	GEMINI_API_KEY
	} = process.env;

// for wtv reason a console.log prints the port and node_env from process.env
// but the import doesn't work in main app.js
// therefore manuall exporting the port and env

//export const {PORT, NODE_ENV} = { PORT: 5500, NODE_ENV: "development"};
//console.log({PORT, NODE_ENV});
//
// THE .ENV FILE MUST BE IN THE ROOT OF THE DIRECTORY
// IE WHERE THE NODE PROCESS IS RUNNING
// NOT WHERE THE ENV FILE IS DECLARED
// HOLY FUCK
