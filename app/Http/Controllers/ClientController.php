<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use function compact;

class ClientController extends Controller
{
    function index( Request $request) {
        $clients = Client::all();
        return Inertia::render('Clients/Index', compact('clients'));
    }
    function store( Request $request) {
        $client = new Client();
        $client->name = $request->name;
        $client->color = $request->color;
        $client->priority = $request->priority;
        $client->save();

        return back();
    }
}
