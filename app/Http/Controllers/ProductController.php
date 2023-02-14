<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{

    /**
     * @OA\Get(
     *      path="/products",
     *      operationId="getProductsList",
     *      tags={"Products"},
     *      summary="Get list of products",
     *      description="Returns list of products with filters",
     *      @OA\Parameter(
     *          name="name",
     *          description="Product name",
     *          required=false,
     *          in="query",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="price_from",
     *          description="Minimum price of product",
     *          required=false,
     *          in="query",
     *          @OA\Schema(
     *              type="number",
     *              format="float"
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="price_to",
     *          description="Maximum price of product",
     *          required=false,
     *          in="query",
     *          @OA\Schema(
     *              type="number",
     *              format="float"
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="date_added_from",
     *          description="Start date for product creation",
     *          required=false,
     *          in="query",
     *          @OA\Schema(
     *              type="string",
     *              format="date"
     *          )
     *      ),
     *      @OA\Parameter(
     *          name="date_added_to",
     *          description="End date for product creation",
     *          required=false,
     *          in="query",
     *          @OA\Schema(
     *              type="string",
     *              format="date"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/Product")
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      ),
     *      security={
     *         {
     *             "oauth2_security_example": {"write:products", "read:products"}
     *         }
     *     },
     * )
     */
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('name') && isset($request->name)) {
            $query->where('name', 'like', "%{$request->input('name')}%");
        }

        if ($request->has('price_from') && !empty($request->input('price_from'))) {
            $query->where('price', '>=', $request->input('price_from'));
        }

        if ($request->has('price_to') && !empty($request->input('price_to'))) {
            $query->where('price', '<=', $request->input('price_to'));
        }


        if ($request->has('date_added_from') && isset($request->date_added_from)) {
            $query->where('created_at', '>=', $request->input('date_added_from'));
        }

        if ($request->has('date_added_to') && isset($request->date_added_to)) {
            $query->where('created_at', '<=', $request->input('date_added_to'));
        }


        $products = $query->with(['supplier', 'warehouses'])->get();

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/products/{id}",
     *     summary="Retrieve a single product by id",
     *     tags={"Product"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the product to retrieve",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="id",
     *                 type="integer"
     *             ),
     *             @OA\Property(
     *                 property="name",
     *                 type="string"
     *             ),
     *             @OA\Property(
     *                 property="price",
     *                 type="number"
     *             ),
     *             @OA\Property(
     *                 property="created_at",
     *                 type="string"
     *             ),
     *             @OA\Property(
     *                 property="updated_at",
     *                 type="string"
     *             ),
     *             @OA\Property(
     *                 property="supplier",
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
     *                     property="created_at",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="updated_at",
     *                     type="string"
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="warehouses",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="id",
     *                         type="integer"
     *                     ),
     *                     @OA\Property(
     *                         property="address",
     *                         type="string"
     *                     ),
     *                     @OA\Property(
     *                         property="created_at",
     *                         type="string"
     *                     ),
     *                     @OA\Property(
     *                         property="updated_at",
     *                         type="string"
     *                     )
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Product not found"
     *     )
     * )
     */
    public function show($id)
    {
        $product = Product::with('supplier', 'warehouses')->findOrFail($id);

        return $product;
    }

    /**
     * @OA\Post(
     *   path="/products",
     *   summary="Create a new product",
     *   operationId="createProduct",
     *   tags={"Product"},
     *   @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(
     *       required={"supplier_id", "name", "price"},
     *       @OA\Property(property="supplier_id", type="integer"),
     *       @OA\Property(property="name", type="string"),
     *       @OA\Property(property="price", type="number")
     *     )
     *   ),
     *   @OA\Response(
     *     response=200,
     *     description="Successful operation",
     *     @OA\JsonContent(
     *       type="object",
     *       @OA\Property(property="supplier_id", type="integer"),
     *       @OA\Property(property="name", type="string"),
     *       @OA\Property(property="price", type="number"),
     *       @OA\Property(property="created_at", type="string", format="date-time"),
     *       @OA\Property(property="updated_at", type="string", format="date-time"),
     *       @OA\Property(property="id", type="integer")
     *     )
     *   ),
     *   @OA\Response(
     *     response=400,
     *     description="Bad Request"
     *   ),
     *   @OA\Response(
     *     response=401,
     *     description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *     response=403,
     *     description="Forbidden"
     *   ),
     *   @OA\Response(
     *     response=500,
     *     description="Internal Server Error"
     *   )
     * )
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "supplier_id" => "required",
            "name" => "required",
            "price" => "required|numeric",
        ]);

        $product = new Product;

        $product->supplier_id = $request->input('supplier_id') ?? null;
        $product->name = $request->input('name') ?? null;
        $product->price = $request->input('price') ?? null;

        $product->save();

        session()->flash("success", 'The product was successfully created!');

        return $product;
    }

    /**
     * @OA\Put(
     *     path="/products/{id}",
     *     tags={"Products"},
     *     summary="Update a product",
     *     operationId="updateProduct",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Product id",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\RequestBody(
     *         description="Input data format",
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 ref="#/components/schemas/UpdateProduct",
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 ref="#/components/schemas/Product",
     *             ),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Bad request",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Resource not found",
     *     ),
     * )
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "price" => "numeric",
        ]);
        $product = Product::with('supplier')->findOrFail($id);

        $product->supplier_id = $request->input('supplier_id') ?? $product->supplier_id;
        $product->name = $request->input('name') ?? $product->name;
        $product->price = $request->input('price') ?? $product->price;

        $product->save();

        session()->flash("success", 'The product was successfully updated!');
        return $product;
    }

    /**
     * @OA\Delete(
     *     path="/products/{id}",
     *     tags={"Products"},
     *     summary="Delete a product",
     *     operationId="deleteProduct",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Product id",
     *         @OA\Schema(
     *             type="integer",
     *         ),
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Successful operation",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Resource not found",
     *     ),
     * )
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        session()->flash("success", 'The event was successfully deleted!');
    }
}
