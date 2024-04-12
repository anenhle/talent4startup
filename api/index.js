import express from 'express';
import bodyParser from 'body-parser';
import ordersRoutes  from '../routes/orders.js';

const app = express();
//use port 5000 unless there exits a preconfigured port
const port = 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/orders', ordersRoutes);
//Catches any errors that occur in your application and sends a 422 status code along with an error message.
app.use((err, req, res, next) => {
    //the headersSent property is checked to prevent sending multiple responses for the same request.
    if (res.headersSent) {
        return next(err);
    }
    res.status(422).send("An error occurred. Please try again later.");
});

app.get('/', (req, res) => {
    console.log('orders');
    res.send(JSON.stringify(orders));
});

 app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

export default app;