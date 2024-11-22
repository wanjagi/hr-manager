<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserEquipmentController extends Controller
{
    public function getUserEquipment()
    {
        $user = Auth::user();
        return response()->json($user->equipment);  //  there's a relationship defined
    }

}
