<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;

class GoalsController extends Controller
{
    public function store(Request $request) {
        $goal = Goal::create($request->only(['name', 'priority']));
        return back();
    }
}
