<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function store(Request $request) {
        $request->validate( [
            'activity' => 'required'
        ]);
        $data = $request->except('_token');
        $todo = new Todo();
        $todo->activity = $request->activity;
        $todo->description = $request->get('description', '');
        $todo->effort = $request->get('effort', 1);
        $todo->goal()->associate($request->goal_id);
        $todo->save();

        return back()->with('success', 'Task added');
    }
}
