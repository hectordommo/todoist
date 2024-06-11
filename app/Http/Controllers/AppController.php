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
    function index(Request $request) {
        $goals = Goal::orderBy('priority')->get();
        $clients = Client::orderBy('name')->get();
        $completed = $request->has('completed') && $request->completed;
        $query = Todo::with('client', 'project', 'goal' )
            ->orderBy('priority');
        if(!$completed) {

            $query->where(function($query) { $query->whereNull('completed_at')->whereOr('completed_at', now()->format('Y-m-d')); });
        }
        $todos = $query->get();

        return Inertia::render('Dashboard', compact('goals', 'todos', 'clients', 'completed'));
    }
}
