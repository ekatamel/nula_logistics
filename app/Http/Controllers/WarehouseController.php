<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Warehouse;
use App\Models\Product;
use App\Models\ProductWarehouse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class WarehouseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/warehouses",
     *     summary="Get all warehouses",
     *     description="Returns warehouses.",
     *     tags={"Warehouse"},
     *     @OA\Response(
     *         response=200,
     *         description="Returns the warehouses and their products.",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example="1"),
     *                 @OA\Property(property="supplier", type="array",
     *                     @OA\Items(
     *                         type="object",
     *                         @OA\Property(property="id", type="integer"),
     *                         @OA\Property(property="name", type="string"),
     *                         @OA\Property(property="address", type="string"),
     *                         @OA\Property(property="created_at", type="string"),
     *                         @OA\Property(property="updated_at", type="string"),
     *                     )
     *                 ),
     *                 @OA\Property(property="address", type="string", example="123 Main St"),
     *                 @OA\Property(property="product_count", type="integer", example="10"),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2023-02-14T17:45:00Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2023-02-14T18:15:00Z"),
     *                 @OA\Property(
     *                     property="products",
     *                     type="array",
     *                     @OA\Items(
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example="1"),
     *                         @OA\Property(property="name", type="string", example="Product 1"),
     *                         @OA\Property(property="price", type="number", format="float", example="10.99"),
     *                         @OA\Property(property="quantity", type="integer", example="5"),
     *                         @OA\Property(property="supplier", type="array",
     *                             @OA\Items(
     *                                 type="object",
     *                                 @OA\Property(property="id", type="integer"),
     *                                 @OA\Property(property="name", type="string"),
     *                                 @OA\Property(property="address", type="string"),
     *                                 @OA\Property(property="created_at", type="string"),
     *                                 @OA\Property(property="updated_at", type="string"),
     *                             )
     *                         ),
     *                         @OA\Property(property="created_at", type="string", format="date-time", example="2023-02-14T17:45:00Z"),
     *                         @OA\Property(property="updated_at", type="string", format="date-time", example="2023-02-14T18:15:00Z"),
     *                     )
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Warehouse not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Warehouse not found.")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = $request->input('query');
        $total_products_from = $request->input('total_products_from');
        $total_products_to = $request->input('total_products_to');

        $warehouses = Warehouse::with([
            'productWarehouses.product.supplier'
        ]);

        if ($query) {
            $warehouses = $warehouses->whereHas('productWarehouses.product.supplier', function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })->orWhere('address', 'like', "%{$query}%");
        }
        if ($total_products_from) {
            $warehouses = $warehouses->where('product_count', '>=', $total_products_from);
        }
        if ($total_products_to) {
            $warehouses = $warehouses->where('product_count', '<=', $total_products_to);
        }

        $warehouses = $warehouses->get();

        $result = [];
        foreach ($warehouses as $warehouse) {
            $products = [];
            foreach ($warehouse->productWarehouses as $productWarehouse) {
                $product = [
                    'id' => $productWarehouse->product->id,
                    'name' => $productWarehouse->product->name,
                    'price' => $productWarehouse->product->price,
                    'quantity' => $productWarehouse->quantity,
                    'supplier' => [
                        'id' => $productWarehouse->product->supplier->id,
                        'name' => $productWarehouse->product->supplier->name,
                        'address' => $productWarehouse->product->supplier->address,
                    ],
                ];
                $products[] = $product;
            }

            $result[] = [
                'id' => $warehouse->id,
                'address' => $warehouse->address,
                'product_count' => $warehouse->product_count,
                'created_at' => $warehouse->created_at,
                'updated_at' => $warehouse->updated_at,
                'supplier' => $warehouse->supplier,
                'products' => $products,
            ];
        }

        return response()->json($result);
    }


    /**
     * @OA\Get(
     *     path="/warehouses/{id}",
     *     summary="Get a specific warehouse",
     *     description="Returns details of a specific warehouse including the products it holds.",
     *     tags={"Warehouse"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the warehouse to retrieve",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64",
     *             example=1
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Returns the warehouse and its products.",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="id", type="integer", example="1"),
     *             @OA\Property(property="supplier", type="array",                   @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="address",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="created_at",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="updated_at",
     *                     type="string"
     *                 ),
     *                ),
     *              ),
     *             @OA\Property(property="address", type="string", example="123 Main St"),
     *             @OA\Property(property="product_count", type="integer", example="10"),
     *             @OA\Property(property="created_at", type="string", format="date-time", example="2023-02-14T17:45:00Z"),
     *             @OA\Property(property="updated_at", type="string", format="date-time", example="2023-02-14T18:15:00Z"),
     *             @OA\Property(
     *                 property="products",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example="1"),
     *                     @OA\Property(property="name", type="string", example="Product 1"),
     *                     @OA\Property(property="price", type="number", format="float", example="10.99"),
     *                     @OA\Property(property="quantity", type="integer", example="5"),
     *             @OA\Property(property="supplier", type="array",                   
     *              @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="address",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="created_at",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="updated_at",
     *                     type="string"
     *                 ),
     *                ),
     *              ),
     *                     @OA\Property(property="created_at", type="string", format="date-time", example="2023-02-14T17:45:00Z"),
     *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-02-14T18:15:00Z"),
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Warehouse not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Warehouse not found.")
     *         )
     *     )
     * )
     */
    public function show($id)
    {
        $warehouse = Warehouse::with([
            'productWarehouses.product.supplier'
        ])->findOrFail($id);

        $products = [];
        foreach ($warehouse->productWarehouses as $productWarehouse) {
            $product = [
                'id' => $productWarehouse->product->id,
                'name' => $productWarehouse->product->name,
                'price' => $productWarehouse->product->price,
                'quantity' => $productWarehouse->quantity,
                'supplier' => [
                    'id' => $productWarehouse->product->supplier->id,
                    'name' => $productWarehouse->product->supplier->name,
                    'address' => $productWarehouse->product->supplier->address,
                ],
                'created_at' => $productWarehouse->product->created_at,
                'updated_at' => $productWarehouse->product->updated_at,
            ];
            $products[] = $product;
        }

        $result =
            [
                'id' => $warehouse->id,
                'supplier' => $warehouse->supplier,
                'address' => $warehouse->address,
                'product_count' => $warehouse->product_count,
                'created_at' => $warehouse->created_at,
                'updated_at' => $warehouse->updated_at,
                'supplier' => $warehouse->supplier,
                'products' => $products,
            ];


        return response()->json($result);
    }

    /**
     * @OA\Post(
     *     path="/warehouses",
     *     tags={"Warehouse"},
     *     summary="Create a new warehouse",
     *     @OA\RequestBody(
     *         required=true,
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="supplier_id",
     *                  type="integer",
     *                  description="Supplier's id",
     *                  example="1"
     *              ),
     *              @OA\Property(
     *                  property="address",
     *                  type="string",
     *                  description="Supplier's address",
     *                  example="123 Main St"
     *              ),
     *          )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Warehouse created successfully",
     *               @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="id",
     *                  type="integer",
     *                  description="Warehouse ID"
     *              ),
     *              @OA\Property(
     *                  property="supplier_id",
     *                  type="integer",
     *                  description="Supplier's id"
     *              ),
     *              @OA\Property(
     *                  property="address",
     *                  type="string",
     *                  description="Supplier's address"
     *              ),
     *              @OA\Property(
     *                     property="created_at",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="updated_at",
     *                     type="string"
     *                 ),
     *          )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Unprocessable Entity",
     *     ),
     * )
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "supplier_id" => "required|numeric",
            "address" => "required",
        ]);

        $warehouse = new Warehouse;

        $warehouse->supplier_id = $request->input('supplier_id') ?? null;
        $warehouse->address = $request->input('address') ?? null;

        $warehouse->save();

        session()->flash("success", 'The warehouse was successfully created!');

        return response()->json($warehouse);
    }

    /**
     * @OA\Patch(
     *   path="/warehouses/{id}",
     *   summary="Update a Warehouse",
     *   tags={"Warehouse"},
     *   @OA\Parameter(
     *     name="id",
     *     in="path",
     *     description="ID of the Warehouse",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"supplier_id"},
     *       @OA\Property(property="supplier_id", type="integer", description="ID of the Supplier"),
     *       @OA\Property(property="address", type="string", description="Address of the Warehouse"),
     *     ),
     *   ),
     *     @OA\Response(
     *         response=200,
     *         description="Warehouse updated successfully",
     *               @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="id",
     *                  type="integer",
     *                  description="Warehouse ID"
     *              ),
     *              @OA\Property(
     *                  property="supplier_id",
     *                  type="integer",
     *                  description="Supplier's id"
     *              ),
     *              @OA\Property(
     *                  property="address",
     *                  type="string",
     *                  description="Supplier's address"
     *              ),
     *              @OA\Property(
     *                     property="created_at",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="updated_at",
     *                     type="string"
     *                 ),
     *          )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Unprocessable Entity",
     *     ),
     *   @OA\Response(
     *     response=404,
     *     description="The requested Warehouse was not found"
     *   ),
     *   @OA\Response(
     *     response=400,
     *     description="Bad request"
     *   ),
     * )
     */



    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "supplier_id" => "numeric",
        ]);

        $warehouse = Warehouse::findOrFail($id);

        $warehouse->supplier_id = $request->input('supplier_id') ?? $warehouse->supplier_id;
        $warehouse->address = $request->input('address') ?? $warehouse->address;

        $warehouse->save();

        session()->flash("success", 'The warehouse was successfully updated!');
        return response()->json($warehouse);
    }


    /**
     * @OA\Delete(
     *     path="/warehouses/{id}",
     *     tags={"Warehouses"},
     *     summary="Delete a warehouse",
     *     operationId="deleteWarehouse",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Warehouse id",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The warehouse was successfully deleted!"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Resource not found",
     *     ),
     * )
     */
    public function destroy($id)
    {
        $warehouse = Warehouse::findOrFail($id);
        $warehouse->delete();
        session()->flash("success", 'The warehouse was successfully deleted!');
    }

    /**
     * @OA\Patch(
     *   path="/warehouses/{warehouseId}/products/{productId}",
     *   summary="Assign a Product to a Warehouse",
     *   tags={"Warehouse"},
     *   @OA\Parameter(
     *     name="warehouseId",
     *     in="path",
     *     description="ID of the Warehouse",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\Parameter(
     *     name="productId",
     *     in="path",
     *     description="ID of the Product",
     *     required=true,
     *     @OA\Schema(type="integer")
     *   ),
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       @OA\Property(property="quantity", type="integer", description="Quantity of the Product")
     *     )
     *   ),
     *   @OA\Response(
     *     response=201,
     *     description="Product assigned to Warehouse successfully"
     *   ),
     *   @OA\Response(
     *     response=400,
     *     description="Bad request"
     *   )
     * )
     */
    public function assignProductToWarehouse(Request $request, $warehouseId, $productId)
    {
        $validatedData = $request->validate([
            'quantity' => 'required|integer',
        ]);

        try {
            $warehouse = Warehouse::findOrFail($warehouseId);
            $product = Product::findOrFail($productId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'The given ID was not found'], 404);
        }


        $pivot = $product->warehouses()->wherePivot('warehouse_id', $warehouseId)->first();

        if ($pivot) {
            $product->warehouses()->updateExistingPivot($warehouseId, [
                'quantity' => $validatedData['quantity'],
            ]);
        } else {
            $product->warehouses()->attach($warehouse, [
                'quantity' => $validatedData['quantity'],
            ]);
        }

        $warehouse->updateProductCount();

        return response()->json(['message' => 'Product assigned to warehouse successfully'], 201);
    }
}
