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
        $todo->priority = $request->get('priority', 2);
        $todo->value = $request->get('value', 2);
        $todo->description = $request->get('description', '');
        $todo->effort = $request->get('effort', 1);
        $todo->goal()->associate($request->goal_id);
        $todo->save();

        return back()->with('success', 'Task added');
    }
    public function update(Request $request, Todo $todo) {
        $request->validate([
            'activity' => 'required'
        ]);
        $data = $request->except('_token');
        $todo->activity = $request->get('activity', $todo->activity);
        $todo->completed = $request->get('completed', $todo->completed);
        $todo->priority = $request->get('priority', $todo->priority);
        $todo->value = $request->get('value', $todo->value);
        $todo->description = $request->get('description', $todo->description);
        $todo->effort = $request->get('effort', $todo->effort);
        $todo->goal()->associate($request->goal_id);
        $todo->save();

        return back()->with('success', 'Task added');
    }
}
