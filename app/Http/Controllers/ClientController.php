<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    function store( Request $request) {
        $client = new Client();
        $client->name = $request->name;
        $client->color = $request->color;
        $client->priority = $request->priority;
        $client->save();

        return back();
    }
}
