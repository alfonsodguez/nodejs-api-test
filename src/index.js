import { app, connectDB } from './infrastructure/server/app.js';
import { PORT } from './infrastructure/server/config.js';

(async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();