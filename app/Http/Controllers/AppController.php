<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Goal;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use function compact;

class AppController extends Controller
{
    function index() {
        $goals = Goal::orderBy('priority')->get();
        $clients = Client::orderBy('name')->get();
        $todos = Todo::with('client', 'project', 'goal' )->orderBy('priority')->get();

        return Inertia::render('Dashboard', compact('goals', 'todos', 'clients'));
    }
}
