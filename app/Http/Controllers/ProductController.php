<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        if ($request->has('name')) {
            $query->where('name', 'like', "%{$request->input('name')}%");
        }

        if ($request->has('price_from') && $request->has('price_to')) {
            $query->whereBetween('price', [
                $request->input('price_from'),
                $request->input('price_to'),
            ]);
        }

        if ($request->has('date_added_from') && $request->has('date_added_to')) {
            $query->whereBetween('created_at', [
                $request->input('date_added_from'),
                $request->input('date_added_to'),
            ]);
        }


        $products = $query->with(['supplier', 'warehouses'])->get();

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('supplier', 'warehouses')->findOrFail($id);

        return $product;
    }

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

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        session()->flash("success", 'The event was successfully deleted!');
    }
}
