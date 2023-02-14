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
     *             @OA\Items(ref="#/components/schemas/Supplier")
     *         ),
     *     ),
     * )
     */
    public function index()
    {
        $suppliers = Supplier::with(['products', 'warehouses'])->get();

        return $suppliers;
    }

    /**
     * @OA\Get(
     *     path="/api/suppliers/{id}",
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
     *         @OA\JsonContent(ref="#/components/schemas/Supplier")
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
        return $supplier;
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

        return $supplier;
    }

    /**
     * @OA\Put(
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
     *         @OA\MediaType(
     *             mediaType="application/x-www-form-urlencoded",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="name",
     *                     type="string",
     *                     description="Name of the supplier. Minimum length: 3",
     *                     example="Supplier Name"
     *                 ),
     *                 @OA\Property(
     *                     property="address",
     *                     type="string",
     *                     description="Address of the supplier. Minimum length: 3",
     *                     example="123 Main St"
     *                 ),
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Supplier was successfully updated",
     *         @OA\JsonContent(
     *             ref="#/components/schemas/Supplier"
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Supplier not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             ref="#/components/schemas/ValidationError"
     *         )
     *     )
     * )
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "min:3",
            "address" => "min:3",
        ]);

        $supplier = Supplier::with(['products', 'warehouses'])->findOrFail($id);

        $supplier->name = $request->input('name') ?? $supplier->name;
        $supplier->address = $request->input('address') ?? $supplier->address;

        $supplier->save();

        session()->flash("success", 'The supplier was successfully updated!');

        return $supplier;
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
