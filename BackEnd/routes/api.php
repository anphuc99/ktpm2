<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => \App\Http\Middleware\Cors::class,], function () {
    Route::get('/index', 'Api\IndexController@index')->name('check_login_status');
    Route::get('/detail/{id}', 'Api\IndexController@detail')->name('check_login_status');
    Route::get('/getCategory', 'Api\ProductController@getCategory')->name('check_login_status');
    Route::get('/getProduct/{category}', 'Api\ProductController@getProduct')->name('check_login_status');
    Route::post('/getCart', 'Api\ProductController@cart')->name('check_login_status');
    Route::post('/checkout', 'Api\ProductController@checkCount')->name('check_login_status');
});
