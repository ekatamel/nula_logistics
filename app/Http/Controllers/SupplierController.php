<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Supplier;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::with(['products', 'warehouses'])->get();

        return $suppliers;
    }

    public function show($id)
    {
        $supplier = Supplier::with(['products', 'warehouses'])->findOrFail($id);
        return $supplier;
    }

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

    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();
        session()->flash("success", 'The supplier was successfully deleted!');
    }
}
