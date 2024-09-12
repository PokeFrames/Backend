import express from 'express';
import cors from 'cors';

import routes from './Routes/routes.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
