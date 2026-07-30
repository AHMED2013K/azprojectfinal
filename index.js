// Start CRM server only when a Mongo URI is provided to avoid crashes during deploys
(async () => {
	try {
		const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
		if (mongoUri) {
			await import('./CRM/server/index.js');
		} else {
			// delay logging slightly to ensure visible during startup
			console.warn('MONGODB_URI not set; skipping CRM server startup');
		}
	} catch (err) {
		console.error('Failed to start CRM server:', err?.message || err);
	}
})();
