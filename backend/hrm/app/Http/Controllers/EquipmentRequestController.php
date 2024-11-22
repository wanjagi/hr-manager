<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IssuedEquipment;
use Illuminate\Support\Facades\Auth;

class EquipmentRequestController extends Controller
{
    public function submitRequest(Request $request)
    {
        // Validate the request
        $request->validate([
            'equipment_id' => 'required|exists:equipment,id',
        ]);

        // Store the request in the database
        // Assuming you have an IssuedEquipment model
        IssuedEquipment::create([
            'user_id' => Auth::id(),
            'equipment_id' => $request->equipment_id,
            'status' => 'pending', // Initial status
        ]);

        return response()->json(['message' => 'Request submitted successfully.']);
    }
}

