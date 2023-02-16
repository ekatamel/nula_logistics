<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name("login");


Route::group(['middleware' => 'auth:sanctum'], function () {
    // AUTH routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);


    // PRODUCT routes
    Route::get('/products', [
        ProductController::class, "index"
    ])->name("products.index");


    Route::get('/products/{id}', [
        ProductController::class, "show"
    ])->whereNumber("id")->name("products.show");

    Route::post('/products', [
        ProductController::class, "store"
    ])->name("products.store");

    Route::patch('/products/{id}', [
        ProductController::class, "update"
    ])->whereNumber("id")->name("products.update");


    Route::delete('/products/{id}', [
        ProductController::class, "destroy"
    ])->whereNumber("id")->name("products.destroy");


    // SUPPLIER routes
    Route::get('/suppliers', [
        SupplierController::class, "index"
    ])->name("suppliers.index");

    Route::get('/suppliers/{id}', [
        SupplierController::class, "show"
    ])->whereNumber("id")->name("suppliers.show");

    Route::post('/suppliers', [
        SupplierController::class, "store"
    ])->name("suppliers.store");

    Route::patch('/suppliers/{id}', [
        SupplierController::class, "update"
    ])->whereNumber("id")->name("suppliers.update");

    Route::delete('/suppliers/{id}', [
        SupplierController::class, "destroy"
    ])->whereNumber("id")->name("suppliers.destroy");


    // WAREHOUSE routes
    Route::get('/warehouses', [
        WarehouseController::class, "index"
    ])->name("warehouses.index");

    Route::get('/warehouses/{id}', [
        WarehouseController::class, "show"
    ])->whereNumber("id")->name("warehouses.show");

    Route::post('/warehouses', [
        WarehouseController::class, "store"
    ])->name("warehouses.store");

    Route::patch('/warehouses/{id}', [
        WarehouseController::class, "update"
    ])->whereNumber("id")->name("warehouses.update");

    Route::delete('/warehouses/{id}', [
        WarehouseController::class, "destroy"
    ])->whereNumber("id")->name("warehouses.destroy");

    Route::patch('/warehouses/{warehouseId}/products/{productId}', [
        WarehouseController::class, 'assignProductToWarehouse'
    ])->whereNumber("warehouseId");

    // STATS routes
    Route::get('/stats', [
        StatsController::class, "statistics"
    ]);
});
