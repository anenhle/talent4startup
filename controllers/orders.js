import { v4 as  uuidv4 } from 'uuid';

let orders = [
    {
        orderId: "12",
        client: "John Doe",
        date: new Date("2019-08-30"),
        total: 64.99,
        deliveringTo: "123 Main St",
        status: "Delivered"
    }
]

export const getOrder = (req, res) => {
    console.log('orders');
    res.send(JSON.stringify(orders));
}

export const createOrder = (req, res) => {
    const order = req.body;
    const orderId =  uuidv4();
    
    // Add the id to our item and send back the full item including the id
    order.orderId = orderId;
    orders.push(order);
    res.send(JSON.stringify({...order, orderId}));
    res.send(`${order.client}'s order has been added.`);
}

export const getOrderById = (req, res) => {
    const {id} = req.params;
    const foundOrder = orders.find((order)=> order.orderId === id);
    if (!foundOrder){
        return res.status(404).send(`Order ${id} was not found.`)
    }
    res.send(JSON.stringify(foundOrder));
}

export const updateOrder = (req, res) =>{
    const {id} = req.params;
    const { client, date, total, deliveringTo } = req.body;
    const foundOrder = orders.find((order)=> order.orderId == id);

    if(!foundOrder){
        return res.status(404).send("The Order you are trying to update does not exist.")
    }

    if(client)order.client = client;
    if(date)order.date = new Date().toISOString();;
    if(total)order.total = Number(total);
    if(deliveringTo)order.deliveringTo = deliveringTo;
    order.status = 'Delivered';
    res.send(JSON.stringify(order));
}

export const deleteOrder = (req,res) => {
    //separate/ extract the orderId from the request parameters
    const {id} = req.params;

    //Get the index of the order in the orders array with the matching id
    const index = orders.findIndex((item) => item.orderId===id);

    //If orderId entered doesn't exist in the order's array or database, the user will be informed.
    if(index === -1){
        return res.status(400).json({message:"The order doesn't exist."});
    }else{
        //Remove the order as requested.
        const remove = orders.splice(index,1)[0];
        res.status(200).json(remove);
        res.send("The order has been successfully deleted.");
    }
}