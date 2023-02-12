<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Warehouse;
use App\Models\Product;
use App\Models\ProductWarehouse;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::with([
            'productWarehouses.product.supplier'
        ])->get();

        $result = [];
        foreach ($warehouses as $warehouse) {
            $products = [];
            foreach ($warehouse->productWarehouses as $productWarehouse) {
                $product = [
                    'id' => $productWarehouse->product->id,
                    'name' => $productWarehouse->product->name,
                    'price' => $productWarehouse->product->price,
                    'quantity' => $productWarehouse->product->quantity,
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
                'quantity' => $productWarehouse->product->quantity,
                'supplier' => [
                    'id' => $productWarehouse->product->supplier->id,
                    'name' => $productWarehouse->product->supplier->name,
                    'address' => $productWarehouse->product->supplier->address,
                ],
            ];
            $products[] = $product;
        }

        $result =
            [
                'id' => $warehouse->id,
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

        $warehouse = Warehouse::with(['products', 'supplier'])->findOrFail($id);

        $warehouse->supplier_id = $request->input('supplier_id') ?? $warehouse->supplier_id;
        $warehouse->address = $request->input('address') ?? $warehouse->supplier_id;

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

    public function storeProduct(Request $request)
    {
        $validatedData = $request->validate([
            'product_id' => 'required|exists:products,id',
            'warehouse_id' => 'required|exists:warehouses,id',
            'quantity' => 'required|integer',
        ]);

        $product = Product::findOrFail($validatedData['product_id']);
        $warehouse = Warehouse::findOrFail($validatedData['warehouse_id']);

        $warehouse->updateProductCount();

        $product->warehouses()->attach($warehouse, [
            'quantity' => $validatedData['quantity'],
        ]);

        return response()->json(['message' => 'Product assigned to warehouse successfully'], 201);
    }
}
