<?php

use Illuminate\Http\Request;

Route::group(['middleware' => ['cors']], function() {
    Route::get('/todos', 'TodoController@index');
    Route::get('/todos/{id}', 'TodoController@show');
    Route::post('/todos', 'TodoController@store');
    Route::put('/todos/{id}', 'TodoController@update');
    Route::delete('/todos/{id}', 'TodoController@delete');
});
