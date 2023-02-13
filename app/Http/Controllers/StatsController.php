<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\Supplier;


class StatsController extends Controller
{
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
