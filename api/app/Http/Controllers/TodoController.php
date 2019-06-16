<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request,
    App\Todo;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function show($id)
    {
        return Todo::find($id);
    }

    public function store(Request $request)
    {
        $todo = Todo::create($request->all());
        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);

        if ($todo) {
            $todo->update($request->all());
        }

        return response()->json($todo, 200);
    }

    public function delete($id)
    {
        $todo = Todo::find($id);

        if ($todo) {
            $todo->delete();
        }

        return response()->json(null, 204);
    }
}
