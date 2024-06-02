<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function compact;

class AppController extends Controller
{
    function index() {
        $goals = Goal::orderBy('priority')->get();


        return Inertia::render('Dashboard', compact('goals'));
    }
}
