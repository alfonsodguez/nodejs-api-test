import { app, connectDB } from './infrastructure/server/app';
import { PORT } from './infrastructure/server/config';

(async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();