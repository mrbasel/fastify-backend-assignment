import { server } from "./src/main";
import "dotenv/config";

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

export const start = async () => {
	try {
		await server.listen({ port });
		console.log(`Server listening on port ${port}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

start();
