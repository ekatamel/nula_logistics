<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
{
    /**
     * @OA\Get(
     *     path="/suppliers",
     *     summary="Retrieve all suppliers",
     *     tags={"Supplier"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
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
     *                 @OA\Property(
     *                     property="products",
     *                     type="array",
     *                     @OA\Items(
     *                      type="object",
     *                  @OA\Property(
     *                     property="id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="supplier_id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="price",
     *                     type="number"
     *                 ),
     *                 @OA\Property(
     *                     property="created_at",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="updated_at",
     *                     type="string"
     *                 ),
     *                 )
     *                 ),
     *      *             @OA\Property(
     *                 property="warehouses",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="id",
     *                         type="integer"
     *                     ),
     *                     @OA\Property(
     *                         property="supplier_id",
     *                         type="integer"
     *                     ),
     *                     @OA\Property(
     *                         property="address",
     *                         type="string"
     *                     ),
     *                     @OA\Property(
     *                         property="product_count",
     *                         type="number"
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
     *             )
     *         )
     *     ),
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
     * )
     */
    public function index()
    {
        $suppliers = Supplier::with(['products', 'warehouses'])->get();

        return response()->json($suppliers);
    }

    /**
     * @OA\Get(
     *     path="/suppliers/{id}",
     *     tags={"Suppliers"},
     *     summary="Get supplier information",
     *     description="Returns detailed information about a single supplier",
     *     operationId="showSupplier",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the supplier",
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
     *                 property="address",
     *                 type="string"
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
     *                 property="products",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="id",
     *                         type="integer"
     *                     ),
     *                     @OA\Property(
     *                         property="supplier_id",
     *                         type="integer"
     *                     ),
     *                     @OA\Property(
     *                         property="name",
     *                         type="string"
     *                     ),
     *                     @OA\Property(
     *                         property="price",
     *                         type="number"
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
     *                         property="supplier_id",
     *                         type="integer"
     *                     ),
     *                     @OA\Property(
     *                         property="address",
     *                         type="string"
     *                     ),
     *                     @OA\Property(
     *                         property="product_count",
     *                         type="number"
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
     *         description="Supplier not found"
     *     )
     * )
     */
    public function show($id)
    {
        $supplier = Supplier::with(['products', 'warehouses'])->findOrFail($id);
        return response()->json($supplier);
    }

    /**
     * @OA\Post(
     *      path="/suppliers",
     *      tags={"Suppliers"},
     *      summary="Create new supplier",
     *      description="Create a new supplier in the database",
     *      @OA\RequestBody(
     *          required=true,
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="name",
     *                  type="string",
     *                  description="Supplier's name",
     *                  example="Supplier A"
     *              ),
     *              @OA\Property(
     *                  property="address",
     *                  type="string",
     *                  description="Supplier's address",
     *                  example="123 Main St"
     *              ),
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="object",
     *              @OA\Property(
     *                  property="id",
     *                  type="integer",
     *                  description="Supplier's ID"
     *              ),
     *              @OA\Property(
     *                  property="name",
     *                  type="string",
     *                  description="Supplier's name"
     *              ),
     *              @OA\Property(
     *                  property="address",
     *                  type="string",
     *                  description="Supplier's address"
     *              ),
     *          )
     *      ),
     *      @OA\Response(
     *          response=400,
     *          description="Bad Request"
     *      ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthorized"
     *      ),
     * )
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "name" => "required|min:3",
            "address" => "required|min:3",
        ]);

        $supplier = new Supplier;

        $supplier->name = $request->input('name') ?? null;
        $supplier->address = $request->input('address') ?? null;

        $supplier->save();

        session()->flash("success", 'The supplier was successfully created!');

        return response()->json($supplier);
    }

    /**
     * @OA\Patch(
     *     path="/suppliers/{id}",
     *     tags={"Suppliers"},
     *     summary="Update a supplier",
     *     operationId="updateSupplier",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the supplier to update",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         description="Supplier data to update",
     *         required=true,
     *          @OA\JsonContent(
     *       @OA\Property(property="name", type="string"),
     *       @OA\Property(property="address", type="string")
     *     )
     *     ),
     *      *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *          @OA\JsonContent(
     *          type="object",
     *          @OA\Property(property="name", type="string"),
     *          @OA\Property(property="address", type="string"),
     *          @OA\Property(property="created_at", type="string", format="date-time"),
     *          @OA\Property(property="updated_at", type="string", format="date-time"),
     *          @OA\Property(property="id", type="integer")
     *     )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Supplier not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "min:3",
            "address" => "min:3",
        ]);

        $supplier = Supplier::findOrFail($id);

        $supplier->name = $request->input('name') ?? $supplier->name;
        $supplier->address = $request->input('address') ?? $supplier->address;

        $supplier->save();

        session()->flash("success", 'The supplier was successfully updated!');

        return response()->json($supplier);
    }

    /**
     * @OA\Delete(
     *     path="/suppliers/{id}",
     *     summary="Delete a supplier",
     *     description="Deletes a supplier with the given ID",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the supplier to delete",
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="The supplier was successfully deleted!"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Supplier not found"
     *     )
     * )
     */
    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();
        session()->flash("success", 'The supplier was successfully deleted!');
    }
}
