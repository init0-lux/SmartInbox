import { Client as WorkFLowClient } from "@upstash/workflow";

import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

export const workflowClient = new WorkFLowClient({
	baseUrl: QSTASH_URL,
	token: QSTASH_TOKEN,
});
