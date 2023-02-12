<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Supplier;
use App\Models\Product;

class Warehouse extends Model
{
    use HasFactory;

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function updateProductCount()
    {
        $this->product_count = $this->productWarehouses()->sum('quantity');
        $this->save();
    }

    public function productWarehouses()
    {
        return $this->hasMany(ProductWarehouse::class);
    }
}
