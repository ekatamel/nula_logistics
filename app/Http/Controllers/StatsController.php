<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\Supplier;


class StatsController extends Controller
{

    /**
     * @OA\Get(
     *     path="/stats",
     *     summary="Get statistics",
     *     description="Retrieve statistics about products, warehouses, and suppliers",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="most_expensive_product",
     *                 type="object",
     *                 description="The most expensive product",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="price", type="integer"),
     *                 @OA\Property(property="supplier_id", type="integer"),
     *                 @OA\Property(property="created_at", type="string"),
     *                 @OA\Property(property="updated_at", type="string")
     *             ),
     *             @OA\Property(
     *                 property="most_loaded_warehouse",
     *                 type="object",
     *                 description="The most loaded warehouse",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="address", type="string"),
     *                 @OA\Property(property="supplier_id", type="integer"),
     *                 @OA\Property(property="product_count", type="integer"),
     *                 @OA\Property(property="created_at", type="string"),
     *                 @OA\Property(property="updated_at", type="string")
     *             ),
     *             @OA\Property(
     *                 property="biggest_supplier",
     *                 type="object",
     *                 description="The biggest supplier",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="address", type="string"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="created_at", type="string"),
     *                 @OA\Property(property="updated_at", type="string")
     *             ),
     *             @OA\Property(
     *                 property="total_suppliers",
     *                 type="integer",
     *                 description="The total number of suppliers"
     *             ),
     *             @OA\Property(
     *                 property="total_warehouses",
     *                 type="integer",
     *                 description="The total number of warehouses"
     *             ),
     *             @OA\Property(
     *                 property="total_products",
     *                 type="integer",
     *                 description="The total number of products"
     *             )
     *         )
     *     )
     * )
     */
    public function statistics()
    {
        $most_expensive_product = Product::orderBy('price', 'desc')->first();
        $most_loaded_warehouse = Warehouse::orderBy('product_count', 'desc')->first();
        $biggest_supplier = Supplier::withCount('products')->orderBy('products_count', 'desc')->first();

        $total_suppliers = Supplier::count();
        $total_warehouses = Warehouse::count();
        $total_products = Product::count();

        return [
            'most_expensive_product' => $most_expensive_product,
            'most_loaded_warehouse' => $most_loaded_warehouse,
            'biggest_supplier' => $biggest_supplier,
            'total_suppliers' => $total_suppliers,
            'total_warehouses' => $total_warehouses,
            'total_products' => $total_products,
        ];
    }
}
