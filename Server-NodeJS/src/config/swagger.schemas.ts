/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: Representa un usuario del sistema
 *       required:
 *         - id
 *         - name
 *         - lastName
 *         - age
 *         - email
 *         - engineering
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Carlos
 *         lastName:
 *           type: string
 *           example: Ramírez
 *         age:
 *           type: number
 *           example: 22
 *         email:
 *           type: string
 *           format: email
 *           example: carlos.ramirez@example.com
 *         engineering:
 *           type: string
 *           enum:
 *             - Sistemas
 *             - Electronica
 *             - Biomedica
 *             - Industrial
 *             - Ambiental
 *           example: Sistemas
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       description: Representa un producto del sistema
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Leche entera
 *         category:
 *           type: string
 *           enum:
 *             - Lacteos
 *             - Carnes
 *             - Frutas
 *             - Verduras
 *           example: Lacteos
 *         price:
 *           type: number
 *           example: 4500
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       description: Respuesta de error estándar generada por HandleError
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           example: countCourses debe ser un entero entre 1 y 100
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       description: Representa un curso académico
 *       required:
 *         - id
 *         - name
 *         - teacher
 *         - credits
 *         - modality
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Arquitectura de Software
 *         teacher:
 *           type: string
 *           example: Laura Martínez
 *         credits:
 *           type: number
 *           minimum: 1
 *           maximum: 4
 *           example: 3
 *         modality:
 *           type: string
 *           enum:
 *             - Presencial
 *             - Virtual
 *             - Hibrido
 *           example: Presencial
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       description: Representa un pedido realizado por un cliente
 *       required:
 *         - id
 *         - customer
 *         - total
 *         - status
 *         - date
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         customer:
 *           type: string
 *           example: María López
 *         total:
 *           type: number
 *           example: 149.99
 *         status:
 *           type: string
 *           enum:
 *             - Pendiente
 *             - Enviado
 *             - Entregado
 *             - Cancelado
 *           example: Pendiente
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-03-15T10:30:00.000Z"
 */

export {};