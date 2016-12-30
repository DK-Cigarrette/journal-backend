import express, { Router } from 'express'
const router = Router();

router.get('/', (req, res, get) => {
    res.render('index');
});

export default router