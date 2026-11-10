import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateCreateProduct, validateUpdateProduct } from '../validators/product.validator';

const router: Router = Router();

const productController = new ProductController();

router.post('/', 
  validateCreateProduct, 
  (req: Request, res: Response, next: NextFunction) => {
    productController.createProduct(req, res, next);
  }
);

router.get('/', 
  (req: Request, res: Response, next: NextFunction) => {
    productController.getAllProducts(req, res, next);
  }
);

router.get('/:id', 
  (req: Request, res: Response, next: NextFunction) => {
    productController.getProductById(req, res, next);
  }
);

router.put('/:id', 
  validateUpdateProduct, 
  (req: Request, res: Response, next: NextFunction) => {
    productController.updateProduct(req, res, next);
  }
);

router.delete('/:id', 
  (req: Request, res: Response, next: NextFunction) => {
    productController.deleteProduct(req, res, next);
  }
);

router.options('/', 
  (_req: Request, res: Response) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).send();
  }
);

router.options('/:id', 
  (_req: Request, res: Response) => {
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(204).send();
  }
);

export default router;