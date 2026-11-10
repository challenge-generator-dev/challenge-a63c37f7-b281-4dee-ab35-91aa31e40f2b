import { body, param, query, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationException } from '../exceptions/validation.exception';

export const createProductValidationRules: ValidationChain[] = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Product name must be between 2 and 100 characters'),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number greater than 0'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Product category is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category must be between 2 and 50 characters')
];

export const updateProductValidationRules: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID'),
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Product name cannot be empty')
        .isLength({ min: 2, max: 100 })
        .withMessage('Product name must be between 2 and 100 characters'),
    body('price')
        .optional()
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number greater than 0'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    body('category')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Category cannot be empty')
        .isLength({ min: 2, max: 50 })
        .withMessage('Category must be between 2 and 50 characters')
];

export const getProductByIdValidationRules: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID')
];

export const deleteProductValidationRules: ValidationChain[] = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID')
];

export const getProductsValidationRules: ValidationChain[] = [
    query('category')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Category filter must be between 2 and 50 characters'),
    query('search')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Search query must be between 1 and 100 characters'),
    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum price must be a non-negative number'),
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be a non-negative number'),
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100')
];

export const productIdParamValidation = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isUUID()
        .withMessage('Product ID must be a valid UUID')
];

export const validateCreateProduct = [
    ...createProductValidationRules,
    (req: Request, _res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                field: 'path' in err ? err.path : 'unknown',
                message: err.msg,
                value: 'path' in err ? req.body[err.path as keyof typeof req.body] : undefined
            }));
            throw ValidationException.fromExpressValidatorErrors(formattedErrors as any);
        }
        next();
    }
];

export const validateUpdateProduct = [
    ...updateProductValidationRules,
    (req: Request, _res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                field: 'path' in err ? err.path : 'unknown',
                message: err.msg,
                value: 'path' in err ? req.body[err.path as keyof typeof req.body] : undefined
            }));
            throw ValidationException.fromExpressValidatorErrors(formattedErrors as any);
        }
        next();
    }
];