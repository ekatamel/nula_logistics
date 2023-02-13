<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Warehouse;
use App\Models\Product;
use App\Models\ProductWarehouse;

class WarehouseController extends Controller
{
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

        return $warehouse;
    }

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
        return $warehouse;
    }

    public function delete($id)
    {
        $warehouse = Warehouse::findOrFail($id);
        $warehouse->delete();
        session()->flash("success", 'The warehouse was successfully deleted!');
    }

    public function assignProductToWarehouse(Request $request, $warehouseId)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        $product_id = $request->input('product_id') ?? null;

        $warehouse = Warehouse::findOrFail($warehouseId);
        $product = Product::findOrFail($product_id);

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
