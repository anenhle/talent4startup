import express from 'express';
import { createOrder, getOrder, getOrderById, updateOrder, deleteOrder } from '../controllers/orders.js';

const router = express.Router();


// GET all Orders
router.get('/', getOrder); 

// POST a new Order to the database
router.post('/', createOrder);

// Get an individual order by its ID
router.get('/:id',getOrderById);

//  Update an existing order by its ID - set the status to 'delivered'.
router.patch("/:id", updateOrder);

// Delete a specific order by its Id
router.delete('/:id', deleteOrder);

export default router;